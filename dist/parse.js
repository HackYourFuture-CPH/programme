import mit from "markdown-it";
export const parse = (content) => {
    const parser = mit();
    const tokens = parser.parse(content, {});
    const parsedLinks = [];
    const parsedImages = [];
    const scan = (tokens) => {
        tokens.forEach((token, index) => {
            if (token.type === "link_open") {
                const indexOfNextClose = tokens.findIndex((t2, i2) => i2 > index && t2.type === "link_close");
                if (indexOfNextClose > index) {
                    parsedLinks.push({
                        target: token.attrGet("href"),
                        content: tokens
                            .slice(index + 1, indexOfNextClose)
                            .map((t) => t.content)
                            .join(""),
                    });
                }
            }
            if (token.type === "image")
                parsedImages.push({
                    src: token.attrGet("src"),
                    alt: token.content,
                });
            if (token.children)
                scan(token.children);
        });
    };
    scan(tokens);
    return {
        links: parsedLinks,
        images: parsedImages,
    };
};
