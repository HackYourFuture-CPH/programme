"use strict";

import { exec } from "node:child_process";
import * as path from "node:path";

import { readFile, writeFile } from "node:fs/promises";

const findMarkdownFilesInGit = async () => {
  return await new Promise((resolve, reject) => {
    exec("git ls-files -z", (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve(stdout.split("\0").filter((s) => s.endsWith(".md")));
    });
  });
};

const findMarkdownFiles = async () => {
  const ignorePattern = /^(README|LICENSE|contributing\/)/;
  return (await findMarkdownFilesInGit()).filter((f) => !ignorePattern.test(f));
};

const findLinks = async (content) => {
  // Dirty, inaccurate markdown parse
  const all = content.matchAll(
    /(?<bang>!)?\[(?<text>.*?)\]\((?<target>.*?)\)/g,
  );
  return [...all].map((m) => ({
    isImage: !!m.groups.bang,
    text: m.groups.text,
    target: m.groups.target,
  }));
};

const scanForLinks = async (filenames) => {
  return Promise.all(
    filenames.map((filename) =>
      readFile(filename, "utf-8").then((content) =>
        findLinks(content).then((links) => ({ filename, links })),
      ),
    ),
  );
};

const localMarkdownToMarkdownLinks = (links) => {
  return links
    .map((l) => ({
      ...l,
      links: l.links.filter(
        (t) => !t.isImage && !t.target.startsWith("https:"),
      ),
    }))
    .filter((f) => f.links.length > 0);
};

const makeResolver = (filenameToNodeId) => {
  // TODO: could make this case-insensitive, but it's probably both
  // easier and more helpful to be more strict.
  return (fromFile, target) => {
    let resolved = path.join(path.dirname(fromFile), target);
    let id = filenameToNodeId.get(resolved);
    if (id) return { id, resolved, isNew: false };

    resolved = path.join(path.dirname(fromFile), target) + "/README.md";
    id = filenameToNodeId.get(resolved);
    if (id) return { id, resolved, isNew: false };

    resolved = path.join(path.dirname(fromFile), target) + "/readme.md";
    id = filenameToNodeId.get(resolved);
    if (id) return { id, resolved, isNew: false };

    const newId = `id${filenameToNodeId.size + 1}`;
    const unresolved = path.join(path.dirname(fromFile), target);
    filenameToNodeId.set(unresolved, newId);
    return { id: newId, resolved: unresolved, isNew: true };
  };
};

const buildGraph = (markdownFilenames, trimmed) => {
  const nodeLines = [];
  const edgeLines = [];

  const filenameToNodeId = new Map(
    markdownFilenames.map((filename, index) => [filename, `id${index}`]),
  );
  //   console.dir([...filenameToNodeId.entries()]);

  const targetResolver = makeResolver(filenameToNodeId);
  const seenEdges = new Set();

  for (const [filename, nodeId] of filenameToNodeId.entries()) {
    nodeLines.push(`  ${nodeId}[${JSON.stringify(filename)}]`);
  }

  for (const links of trimmed) {
    const fromNodeId = filenameToNodeId.get(links.filename);

    for (const l of links.links) {
      const r = targetResolver(links.filename, l.target);

      if (r.isNew) {
        const label = `?? ${r.resolved} ??`;
        nodeLines.push(`  ${r.id}[${JSON.stringify(label)}]`);
      }

      const edgeKey = `${fromNodeId} to ${r.id}`;
      if (!seenEdges.has(edgeKey)) {
        edgeLines.push(`  ${fromNodeId}-->${r.id}`);
        seenEdges.add(edgeKey);
      }
    }
  }

  // Stable output
  return [...nodeLines.toSorted(), ...edgeLines.toSorted()];
};

const main = async () => {
  const markdownFilenames = await findMarkdownFiles();
  const links = await scanForLinks(markdownFilenames);
  const trimmed = localMarkdownToMarkdownLinks(links);

  const graphLines = buildGraph(markdownFilenames, trimmed);
  const graphContent =
    ["```mermaid", "graph LR;", ...graphLines, "```"].join("\n") + "\n";

  await writeFile("diagram.md", graphContent, "utf-8");
  console.log("Wrote diagram.md");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
