"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookConfig = void 0;
class BookConfig {
}
exports.BookConfig = BookConfig;
BookConfig.conf_book1 = {
    host: "https://m.booktxt.com/",
    search: {
        selectors: [".result-item.result-game-item"],
        attribs: [{ name: "title", path: " a", att: "1.attribs.title" },
            { name: "link", path: " a", att: "1.attribs.href" },
            { name: "img", path: " a img", att: "0.attribs.src" }]
    },
    page: {
        selectors: ["body  div.search-result-page  div  a"],
        attribs: [{ name: "title", path: "", att: "0.attribs.title" },
            { name: "link", path: " ", att: "0.attribs.href" },
            { name: "txt", path: " ", att: "0.children.0.data" }]
    },
    pageList: {
        selectors: ["body  div.cover  ul:nth-child(11)  li"],
        attribs: [{ name: "title", path: " a", att: "0.children.0.data" },
            { name: "link", path: " a", att: "0.attribs.href" }]
    },
    pageSelect: {
        selectors: ["body  div.cover  div.listpage  span.middle  select  option"],
        attribs: [{ name: "title", path: " ", att: "0.children.0.data" },
            { name: "link", path: " ", att: "0.attribs.value" }]
    },
    pageText: {
        selectors: ["#nr1"],
        attribs: [{ name: "txt", path: "", att: "text" }]
    },
    textOption: {
        selectors: [".prev_chapter", ".next_chapter"],
        attribs: [{ name: "txt", path: "", att: "0.children.0.children.0.data" },
            { name: "link", path: "", att: "0.children.0.attribs.href" }]
    },
    chapterTitle: {
        selectors: ["#nr_title"],
        attribs: [{ name: "txt", path: "", att: "0.children.0.data" }]
    }
};
BookConfig.conf_book2 = {
    host: "http://m.biquge.info/",
    search: {
        selectors: [".case_name"],
        attribs: [{ name: "title", path: "m", att: "children.1.children.0.children.0.data" },
            { name: "link", path: "m", att: "children.1.attribs.href" },
            { name: "img", path: "m", att: "children.0.data" }]
    },
    page: {
        selectors: ["body  div.search-result-page  div  a"],
        attribs: [{ name: "title", path: "", att: "0.attribs.title" },
            { name: "link", path: " ", att: "0.attribs.href" },
            { name: "txt", path: " ", att: "0.children.0.data" }]
    },
    pageList: {
        selectors: ["body  div.cover  ul:nth-child(10)  li"],
        attribs: [{ name: "title", path: " a", att: "0.children.0.data" },
            { name: "link", path: " a", att: "0.attribs.href" }]
    },
    pageSelect: {
        selectors: ["body  div.cover  div.listpage  span.middle  select  option"],
        attribs: [{ name: "title", path: " ", att: "0.children.0.data" },
            { name: "link", path: " ", att: "0.attribs.value" }]
    },
    pageText: {
        selectors: ["#nr"],
        attribs: [{ name: "txt", path: "", att: "text" }]
    },
    textOption: {
        selectors: ["#zj  section.zj  div:nth-child(3)  a:nth-child(1)", "#zj  section.zj  div:nth-child(3)  a:nth-child(3)"],
        attribs: [{ name: "txt", path: "", att: "0.children.0.data" },
            { name: "link", path: "", att: "0.attribs.href" }]
    },
    chapterTitle: {
        selectors: ["#header  div.zhong"],
        attribs: [{ name: "txt", path: "", att: "0.children.0.data" }]
    }
};
//# sourceMappingURL=BookConfig.js.map