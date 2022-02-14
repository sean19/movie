"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookAnlysis = void 0;
const WebCrawler_1 = require("../../crawler/WebCrawler");
const SequelizeMgr_1 = require("../../SequelizeMgr");
const BookConfig_1 = require("./BookConfig");
class BookAnlysis {
    static getBookData(platform, res) {
        var data = null;
        switch (platform) {
            case "1":
                data = BookAnlysis.getBook1Search(res);
                break;
            case "2":
                data = BookAnlysis.getBook2Search(res);
                break;
        }
        return data;
    }
    static getBookChapter(platform, res) {
        var data;
        switch (platform) {
            case "1":
                data = BookAnlysis.getBook1Chapter(res);
                break;
            case "2":
                data = BookAnlysis.getBook2Chapter(res);
                break;
        }
        return data;
    }
    static getBookInfo(platform, res) {
        var data;
        switch (platform) {
            case "1":
                data = BookAnlysis.getBook1Info(res);
                break;
            case "2":
                data = BookAnlysis.getBook2Info(res);
                break;
        }
        return data;
    }
    static getBook1Search(res) {
        var data = {};
        var wc = new WebCrawler_1.WebCrawler();
        var configbook = SequelizeMgr_1.SequelizeMgr.instance.configSQL.getBookConfigByPlatformID("1");
        // var str: string = configbook.search.replace(/\r\n/g, "");
        // var str: string = str.replace(/\n/g, "");
        data["search"] = wc.getResult(res, JSON.parse(configbook.searchinfo), BookConfig_1.BookConfig.conf_book1["host"]);
        data["page"] = wc.getResult(res, JSON.parse(configbook.searchpage), BookConfig_1.BookConfig.conf_book1["host"]);
        return data;
    }
    static getBook2Search(res) {
        var data = {};
        var wc = new WebCrawler_1.WebCrawler();
        data["search"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.search, BookConfig_1.BookConfig.conf_book2["host"]);
        data["page"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.page, BookConfig_1.BookConfig.conf_book2["host"]);
        return data;
    }
    static getBook1Chapter(res) {
        var data = {};
        var wc = new WebCrawler_1.WebCrawler();
        var configbook = SequelizeMgr_1.SequelizeMgr.instance.configSQL.getBookConfigByPlatformID("1");
        data["pageList"] = wc.getResult(res, JSON.parse(configbook.chapterpage), BookConfig_1.BookConfig.conf_book1["host"]);
        data["pageSelect"] = wc.getResult(res, JSON.parse(configbook.chapterselect), BookConfig_1.BookConfig.conf_book1["host"]);
        return data;
    }
    static getBook2Chapter(res) {
        var data = {};
        var wc = new WebCrawler_1.WebCrawler();
        data["pageList"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.pageList, BookConfig_1.BookConfig.conf_book2["host"]);
        data["pageSelect"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.pageSelect, BookConfig_1.BookConfig.conf_book2["host"]);
        return data;
    }
    static getBook1Info(res) {
        var data = {};
        var wc = new WebCrawler_1.WebCrawler();
        console.log(JSON.stringify(BookConfig_1.BookConfig.conf_book1.chapterTitle));
        console.log(JSON.stringify(BookConfig_1.BookConfig.conf_book1.textOption));
        console.log(JSON.stringify(BookConfig_1.BookConfig.conf_book1.pageText));
        var configbook = SequelizeMgr_1.SequelizeMgr.instance.configSQL.getBookConfigByPlatformID("1");
        // data["pageText"] = wc.getResult(res, JSON.parse(configbook.infotext), BookConfig.conf_book1["host"]);
        // data["textOption"] = wc.getResult(res, JSON.parse(configbook.infooption), BookConfig.conf_book1["host"]);
        // data["chapterTitle"] = wc.getResult(res, JSON.parse(configbook.infotext), BookConfig.conf_book1["host"]);
        // data["pageText"] = wc.getResult(res, BookConfig.conf_book1.pageText, BookConfig.conf_book1["host"]);
        // data["textOption"] = wc.getResult(res, BookConfig.conf_book1.textOption, BookConfig.conf_book1["host"]);
        // data["chapterTitle"] = wc.getResult(res, BookConfig.conf_book1.chapterTitle, BookConfig.conf_book1["host"]);
        return data;
    }
    static getBook2Info(res) {
        var data = {};
        var wc = new WebCrawler_1.WebCrawler();
        data["pageText"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.pageText, BookConfig_1.BookConfig.conf_book2["host"]);
        data["textOption"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.textOption, BookConfig_1.BookConfig.conf_book2["host"]);
        data["chapterTitle"] = wc.getResult(res, BookConfig_1.BookConfig.conf_book2.chapterTitle, BookConfig_1.BookConfig.conf_book2["host"]);
        return data;
    }
}
exports.BookAnlysis = BookAnlysis;
//# sourceMappingURL=BookAnlysis.js.map