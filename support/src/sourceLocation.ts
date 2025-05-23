export type SourceLocation = {
  readonly line0: number;
  readonly column0: number;
};

export const markUpContent = (content: string): string => {
  return content
    .split(/\n/)
    .map((lineText, line0) =>
      lineText.replaceAll(
        /(?<![\p{Alpha}\p{Number}])([\p{Alpha}\p{Number}]+)/gu,
        (matchedText, _, matchedIndex) =>
          /^\d+$/.test(matchedText)
            ? matchedText
            : `L${line0}C${matchedIndex}T${matchedText}`,
      ),
    )
    .join("\n");
};

export const unMarkUpContent = (s: string) =>
  s.replaceAll(
    /(?<![\p{Alpha}\p{Number}])L\d+C\d+T([\p{Alpha}\p{Number}]+)/gu,
    (_, t) => t,
  );

export const sourceLocationOf = (
  markedUpText: string,
): SourceLocation | null => {
  const m = markedUpText.match(/L(?<line0>\d+)C(?<column0>\d+)T/);

  if (m?.groups) {
    return {
      line0: Number(m.groups.line0),
      column0: Number(m.groups.column0) - (m.index ?? 0),
    };
  }

  return null;
};
