import mit from "markdown-it";
import type { Token } from "markdown-it/index.js";

export type ParsedLink = {
  readonly target: string;
  readonly content: string;
};

export type ParsedImage = {
  readonly src: string;
  readonly alt: string;
};

export type ParseResult = {
  readonly links: readonly ParsedLink[];
  readonly images: readonly ParsedImage[];
};

export const parse = (content: string): ParseResult => {
  const parser = mit();
  const tokens = parser.parse(content, {});

  const parsedLinks: ParsedLink[] = [];
  const parsedImages: ParsedImage[] = [];

  const scan = (tokens: Token[]) => {
    tokens.forEach((token, index) => {
      if (token.type === "link_open") {
        const indexOfNextClose = tokens.findIndex(
          (t2, i2) => i2 > index && t2.type === "link_close",
        );

        if (indexOfNextClose > index) {
          parsedLinks.push({
            target: token.attrGet("href") as string,
            content: tokens
              .slice(index + 1, indexOfNextClose)
              .map((t) => t.content)
              .join(""),
          });
        }
      }

      if (token.type === "image")
        parsedImages.push({
          src: token.attrGet("src") as string,
          alt: token.content,
        });

      if (token.children) scan(token.children);
    });
  };

  scan(tokens);

  return {
    links: parsedLinks,
    images: parsedImages,
  };
};
