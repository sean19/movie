import { Request, Response } from "express";
import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { MovieVO } from "../util/VO/MovieVO";
import { RecordSearch } from "../../sqlTable/RecordSearch";
import { MovieClawer } from "../util/movie/MovieClawer";
import { ConfigMgr } from "../../ConfigMgr";
import { MovieConfigVO } from "../util/VO/MovieConfigVO";
import { MovieEngin } from "../util/movie/engin/MovieEngin";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { BookConfig } from "../util/BookConfig";
import { PostCrawler } from "../../crawler/PostCrawler";
import { TConfigBook } from "../../sqlTable/TConfigBook";
import { SequelizeMgr } from "../../SequelizeMgr";

export class Config_book_get_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.keyword || '';
            var bookconfig: TConfigBook = await TConfigBook.findByPk(id);
            if (id == "" || bookconfig == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
                return;
            }
            this.sendResult(res, { "error": 0, "data": bookconfig });
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
    protected getBooURI(platform: string, keyword: string, page: string): any {
        var uri: string = "";
        var urlencode = require('urlencode');
        var chartset = "utf-8";
        var configbook: TConfigBook = SequelizeMgr.instance.configSQL.getBookConfigByPlatformID(platform)
        switch (platform) {
            case "1":
                uri = configbook.host + (keyword ? "search.php?q=" + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
                return uri;
                break;
            case "2":
                uri = BookConfig.conf_book2["host"] + (keyword ? "modules/article/search.php?q=" + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
                return uri;
                break;
        }
        return uri;
    }



}