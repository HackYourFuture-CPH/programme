import mit from "markdown-it";
import type { Token } from "markdown-it/index.js";
import {
  markUpContent,
  sourceLocationOf,
  unMarkUpContent,
  type SourceLocation,
} from "./sourceLocation.js";

export type ParsedLink = {
  readonly target: string;
  readonly content: string;
  readonly sourceLocation: SourceLocation | null;
};

export type ParsedImage = {
  readonly src: string;
  readonly alt: string;
  readonly sourceLocation: SourceLocation | null;
};

export type DeprecatedTerm = {
  readonly term: string;
  readonly word: string;
  readonly sourceLocation: SourceLocation;
};

export type ParseResult = {
  readonly links: readonly ParsedLink[];
  readonly images: readonly ParsedImage[];
  readonly trailingWhitespace: readonly SourceLocation[];
  readonly deprecatedTerm: readonly DeprecatedTerm[];
};

export const parse = (content: string): ParseResult => {
  const trailingWhitespace: SourceLocation[] = [];
  const deprecatedTerm: DeprecatedTerm[] = [];

  content.split(/\n/).forEach((line, index) => {
    if (line.endsWith(" ")) {
      trailingWhitespace.push({
        line0: index,
        column0: line.trimEnd().length,
      });
    }
  });

  const parser = mit();
  const tokens = parser.parse(markUpContent(content), {});

  const parsedLinks: ParsedLink[] = [];
  const parsedImages: ParsedImage[] = [];

  const scan = (tokens: Token[]) => {
    tokens.forEach((token, index) => {
      if (token.type === "link_open") {
        const indexOfNextClose = tokens.findIndex(
          (t2, i2) => i2 > index && t2.type === "link_close",
        );

        if (indexOfNextClose > index) {
          const markedUpTarget = token.attrGet("href") as string;
          parsedLinks.push({
            target: unMarkUpContent(markedUpTarget),
            content: tokens
              .slice(index + 1, indexOfNextClose)
              .map((t) => unMarkUpContent(t.content))
              .join(""),
            sourceLocation: sourceLocationOf(markedUpTarget),
          });
        }
      }

      if (token.type === "image") {
        const markedUpSrc = token.attrGet("src") as string;
        parsedImages.push({
          src: unMarkUpContent(markedUpSrc),
          alt: unMarkUpContent(token.content),
          sourceLocation: sourceLocationOf(markedUpSrc),
        });
      }

      if (token.type === "text") {
        // console.dir(token, { depth: 2 });
        for (const match of token.content.matchAll(
          /L(?<line0>\d+)C(?<column0>\d+)T(?<word>[\p{Alpha}\p{Number}]*(?<term>homework|student|teacher|bootcamp|classroom|class)[\p{Alpha}\p{Number}]*)/giu,
        )) {
          // console.dir(match, { depth: 1 });
          match.groups &&
            deprecatedTerm.push({
              term: match.groups.term.toLowerCase(),
              word: match.groups.word,
              sourceLocation: {
                line0: Number(match.groups.line0),
                column0: Number(match.groups.column0),
              },
            });
        }
      }

      if (token.children) scan(token.children);
    });
  };

  scan(tokens);

  return {
    links: parsedLinks,
    images: parsedImages,
    trailingWhitespace,
    deprecatedTerm,
  };
};
