import sanitize, { IOptions } from "sanitize-html";

const allowedTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "p",
  "a",
  "ul",
  "ol",
  "nl",
  "li",
  "b",
  "i",
  "strong",
  "em",
  "strike",
  "code",
  "hr",
  "br",
  "div",
  "caption",
  "pre",
  "img",
  "figure",
  "figcaption",
  "span",
];

const allowedClasses = allowedTags.reduce(
  (acc: IOptions["allowedClasses"], tag: string) => {
    if (acc) {
      acc[tag] = [/^ql-/];
      return acc;
    }
  },
  {}
);

export const sanitizeHtml = (html: string) => {
  return sanitize(html, {
    allowedTags,
    allowedClasses,
  });
};
