import { WebCrawler } from "../../crawler/WebCrawler";
import { SequelizeMgr } from "../../SequelizeMgr";
import { TConfigBook } from "../../sqlTable/TConfigBook";
import { BookConfig } from "./BookConfig";

export class BookAnlysis {
    public static getBookData(platform: string, res): any {
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
    public static getBookChapter(platform: string, res): any {
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
    public static getBookInfo(platform: string, res): any {
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

    protected static getBook1Search(res): any {
        var data = {};
        var wc = new WebCrawler();
        var configbook: TConfigBook = SequelizeMgr.instance.configSQL.getBookConfigByPlatformID("1");
        // var str: string = configbook.search.replace(/\r\n/g, "");
        // var str: string = str.replace(/\n/g, "");
        data["search"] = wc.getResult(res, JSON.parse(configbook.searchinfo), BookConfig.conf_book1["host"]);
        data["page"] = wc.getResult(res, JSON.parse(configbook.searchpage), BookConfig.conf_book1["host"]);
        return data;
    }
    protected static getBook2Search(res): any {
        var data = {};
        var wc = new WebCrawler();
        data["search"] = wc.getResult(res, BookConfig.conf_book2.search, BookConfig.conf_book2["host"]);
        data["page"] = wc.getResult(res, BookConfig.conf_book2.page, BookConfig.conf_book2["host"]);
        return data;
    }
    protected static getBook1Chapter(res): any {
        var data = {};
        var wc = new WebCrawler();

        var configbook: TConfigBook = SequelizeMgr.instance.configSQL.getBookConfigByPlatformID("1");
        data["pageList"] = wc.getResult(res, JSON.parse(configbook.chapterpage), BookConfig.conf_book1["host"]);
        data["pageSelect"] = wc.getResult(res, JSON.parse(configbook.chapterselect), BookConfig.conf_book1["host"]);
        return data;
    }
    protected static getBook2Chapter(res): any {
        var data = {};
        var wc = new WebCrawler();
        data["pageList"] = wc.getResult(res, BookConfig.conf_book2.pageList, BookConfig.conf_book2["host"]);
        data["pageSelect"] = wc.getResult(res, BookConfig.conf_book2.pageSelect, BookConfig.conf_book2["host"]);
        return data;
    }
    protected static getBook1Info(res): any {
        var data = {};
        var wc = new WebCrawler();
        console.log(JSON.stringify(BookConfig.conf_book1.chapterTitle))
        console.log(JSON.stringify(BookConfig.conf_book1.textOption))
        console.log(JSON.stringify(BookConfig.conf_book1.pageText))
        var configbook: TConfigBook = SequelizeMgr.instance.configSQL.getBookConfigByPlatformID("1");
        // data["pageText"] = wc.getResult(res, JSON.parse(configbook.infotext), BookConfig.conf_book1["host"]);
        // data["textOption"] = wc.getResult(res, JSON.parse(configbook.infooption), BookConfig.conf_book1["host"]);
        // data["chapterTitle"] = wc.getResult(res, JSON.parse(configbook.infotext), BookConfig.conf_book1["host"]);


        // data["pageText"] = wc.getResult(res, BookConfig.conf_book1.pageText, BookConfig.conf_book1["host"]);
        // data["textOption"] = wc.getResult(res, BookConfig.conf_book1.textOption, BookConfig.conf_book1["host"]);
        // data["chapterTitle"] = wc.getResult(res, BookConfig.conf_book1.chapterTitle, BookConfig.conf_book1["host"]);
        return data;
    }
    protected static getBook2Info(res): any {
        var data = {};
        var wc = new WebCrawler();
        data["pageText"] = wc.getResult(res, BookConfig.conf_book2.pageText, BookConfig.conf_book2["host"]);
        data["textOption"] = wc.getResult(res, BookConfig.conf_book2.textOption, BookConfig.conf_book2["host"]);
        data["chapterTitle"] = wc.getResult(res, BookConfig.conf_book2.chapterTitle, BookConfig.conf_book2["host"]);
        return data;
    }
}