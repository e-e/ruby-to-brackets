"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rubyToBrackets = exports.processRuby = void 0;
const cheerio = __importStar(require("cheerio"));
const processRuby = ($, ruby) => {
    let html = $(ruby).html();
    if (typeof html !== "string") {
        return "";
    }
    html = html.replace(/\<rt\>/gi, "[");
    html = html.replace(/\<\/rt\>/gi, "]");
    const root = cheerio.load(html);
    return root("body").text().trim().split("\n").join("").replace(/\s+/g, "");
};
exports.processRuby = processRuby;
const process = ($, nodes) => {
    const pieces = [];
    nodes.each((index, node) => {
        var _a, _b;
        switch (node.type) {
            case "text":
                pieces.push(((_a = node.data) === null || _a === void 0 ? void 0 : _a.trim()) || "");
                break;
            case "tag":
                if (node.tagName === "ruby") {
                    pieces.push((0, exports.processRuby)($, node).trim());
                }
                else {
                    (_b = node.childNodes) === null || _b === void 0 ? void 0 : _b.forEach((child) => {
                        pieces.push(process($, $(child)).trim());
                    });
                }
                break;
        }
    });
    return pieces.map((p) => p.trim()).join("");
};
const rubyToBrackets = (html) => {
    const $ = cheerio.load(html);
    const nodes = $.root().contents();
    return process($, nodes);
};
exports.rubyToBrackets = rubyToBrackets;
