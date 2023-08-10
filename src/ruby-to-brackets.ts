import * as cheerio from "cheerio";

export const processRuby = ($: cheerio.Root, ruby: cheerio.Element): string => {
  let html = $(ruby).html();

  if (typeof html !== "string") {
    return "";
  }

  html = html.replace(/\<rt\>/gi, "[");
  html = html.replace(/\<\/rt\>/gi, "]");

  const root = cheerio.load(html);

  return root("body").text().trim().split("\n").join("").replace(/\s+/g, "");
};

const process = ($: cheerio.Root, nodes: cheerio.Cheerio): string => {
  const pieces: string[] = [];

  nodes.each((index: number, node: cheerio.Element) => {
    switch (node.type) {
      case "text":
        pieces.push(node.data?.trim() || "");
        break;
      case "tag":
        if (node.tagName === "ruby") {
          pieces.push(processRuby($, node).trim());
        } else {
          node.childNodes?.forEach((child: cheerio.Element) => {
            pieces.push(process($, $(child)).trim());
          });
        }
        break;
    }
  });

  return pieces.map((p) => p.trim()).join("");
};

export const rubyToBrackets = (html: string): string => {
  const $ = cheerio.load(html);
  const nodes = $.root().contents();

  return process($, nodes);
};
