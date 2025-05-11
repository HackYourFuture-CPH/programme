import { exec } from "node:child_process";

import { readFile } from "node:fs/promises";
import { parse, type ParseResult } from "./parse.js";
import path, { dirname, normalize } from "node:path/posix";
import { isAbsolute } from "node:path";
import type { SourceLocation } from "./sourceLocation.js";

type ParsedFile = ParseResult & { readonly filename: string };

const findAllFiles = async (): Promise<string[]> => {
  return await new Promise((resolve, reject) => {
    exec(
      "find . -mindepth 1 -name node_modules -prune -o -name .git -prune -o -print0",
      (error, stdout, stderr) => {
        if (error) reject(error);
        if (stderr) reject(new Error(`'find' outputted on stderr: ${stderr}`));
        else
          resolve(
            stdout
              .split("\0")
              .filter(Boolean)
              .map((s) => s.substring(2)), // Remove leading "./"
          );
      },
    );
  });
};

const findMarkdownFiles = (files: string[]): string[] => {
  return files.filter((f) => f.toLocaleLowerCase().endsWith(".md"));
};

const scanForLinks = async (filenames: string[]): Promise<ParsedFile[]> => {
  return Promise.all(
    filenames.map(async (filename) => {
      const content = await readFile(filename, "utf-8");
      return { filename, ...parse(content) };
    }),
  );
};

const showError = (
  filename: string,
  sourceLocation: SourceLocation | null,
  code: string,
  message: string,
) => {
  const src = sourceLocation
    ? `${sourceLocation.line0 + 1}:${sourceLocation.column0 + 1}`
    : "0";
  console.log(`${filename}:${src} ${code} ${message}`);
};

const externalLinkPattern = /^\w+:/;
const isExternalLink = (t: string) => externalLinkPattern.test(t);

const main = async () => {
  const gitFiles = await findAllFiles();

  // For now, we assume that there are no case clashes
  const lowercaseGitFiles = gitFiles.map((s) => s.toLocaleLowerCase());

  const markdownFilenames = findMarkdownFiles(gitFiles);
  const parsedFiles = await scanForLinks(markdownFilenames);

  let errors = 0;

  for (const parsedFile of parsedFiles) {
    for (const ws of parsedFile.trailingWhitespace) {
      showError(
        parsedFile.filename,
        ws,
        "VL003/trailing-whitespace",
        "Trailing whitespace",
      );
      ++errors;
    }

    for (const found of parsedFile.deprecatedTerm) {
      showError(
        parsedFile.filename,
        found.sourceLocation,
        "VL004/deprecated-term",
        `Deprecated term '${found.term}'`,
      );
      if (found.term !== "class") ++errors;
    }

    for (const img of parsedFile.images) {
      if (!isExternalLink(img.src)) {
        const resolved = path.join(dirname(parsedFile.filename), img.src);

        const exists = lowercaseGitFiles.includes(resolved.toLocaleLowerCase());

        if (!exists) {
          showError(
            parsedFile.filename,
            img.sourceLocation,
            "VL002/missing-image-target",
            `Image source does not exist: ${img.src}`,
          );
          ++errors;
        }
      }
    }

    for (const link of parsedFile.links) {
      if (link.target.startsWith("#")) {
        // Already checked by the linter
        continue;
      }

      if (!isExternalLink(link.target)) {
        const target = link.target.split("#")[0];
        let resolved: string;

        if (isAbsolute(target)) {
          resolved = normalize(`./${target}`);
        } else {
          resolved = normalize(path.join(dirname(parsedFile.filename), target));
        }

        const isFile = lowercaseGitFiles.includes(resolved.toLocaleLowerCase());

        const resolvedWithTrailingSlash = resolved.endsWith("/")
          ? resolved.toLocaleLowerCase()
          : `${resolved.toLocaleLowerCase()}/`;
        const isDirectory = lowercaseGitFiles.some((s) =>
          s.startsWith(resolvedWithTrailingSlash),
        );

        if (!isFile && !isDirectory) {
          showError(
            parsedFile.filename,
            link.sourceLocation,
            "VL001/missing-link-target",
            `Link target does not exist: ${target}`,
          );
          ++errors;
        }
      }
    }
  }

  if (errors > 0) process.exit(1);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
