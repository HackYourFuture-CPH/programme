import { exec } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { parse } from "./parse.js";
import path, { dirname, normalize } from "node:path/posix";
import { isAbsolute } from "node:path";
const findMarkdownFilesInGit = async () => {
    return await new Promise((resolve, reject) => {
        exec("git ls-files -z", (error, stdout, stderr) => {
            if (error)
                reject(error);
            if (stderr)
                reject(new Error(`git ls-files outputted on stderr: ${stderr}`));
            else
                resolve(stdout.split("\0").filter((s) => s.endsWith(".md")));
        });
    });
};
const findMarkdownFiles = async () => {
    const ignorePattern = /^(README|LICENSE|contributing\/)/;
    return (await findMarkdownFilesInGit()).filter((f) => !ignorePattern.test(f));
};
const scanForLinks = async (filenames) => {
    return Promise.all(filenames.map(async (filename) => {
        const content = await readFile(filename, "utf-8");
        return { filename, ...parse(content) };
    }));
};
const externalLinkPattern = /^\w+:/;
const isExternalLink = (t) => externalLinkPattern.test(t);
const main = async () => {
    const markdownFilenames = await findMarkdownFiles();
    const parsedFiles = await scanForLinks(markdownFilenames);
    let errors = 0;
    for (const parsedFile of parsedFiles) {
        for (const img of parsedFile.images) {
            if (!isExternalLink(img.src)) {
                const resolved = path.join(dirname(parsedFile.filename), img.src);
                const exists = await stat(resolved).then(() => true, () => false);
                if (!exists) {
                    console.log(`error BROKEN-INTERNAL-IMAGE ${parsedFile.filename}:0 Broken internal image reference ${img.src}`);
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
                let resolved;
                if (isAbsolute(target)) {
                    resolved = normalize(`./${target}`);
                }
                else {
                    resolved = normalize(path.join(dirname(parsedFile.filename), target));
                }
                const stats = await stat(resolved).catch(() => undefined);
                if (stats?.isDirectory()) {
                    const readmeExists = await stat(`${resolved}/README.md`).catch(() => undefined);
                    if (readmeExists) {
                        // console.log(
                        //   `info LINK-TO-DIR-WITH-README ${parsedFile.filename}:0 Link to a directory, which has a README: ${target}`
                        // );
                    }
                    else {
                        console.log(`error LINK-TO-RAW-DIR ${parsedFile.filename}:0 Link to a directory, which has no README: ${target}`);
                        ++errors;
                    }
                }
                else if (stats === undefined) {
                    console.log(`error BROKEN-INTERNAL-LINK ${parsedFile.filename}:0 Link target does not exist: ${target}`);
                    ++errors;
                }
            }
        }
    }
    if (errors > 0) {
        console.error("Link validation found errors");
        process.exit(1);
    }
};
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
