import { rubyToBrackets } from "./ruby-to-brackets";
import { html1, brackets1, html2, brackets2 } from "../fixtures";

describe("rubyToBrackets", () => {
  it("test - 1", () => {
    const actual = rubyToBrackets(html1);
    expect(actual).toBe(brackets1);
  });

  it("test - 2", () => {
    const actual = rubyToBrackets(html2);
    expect(actual).toBe(brackets2);
  });
});
