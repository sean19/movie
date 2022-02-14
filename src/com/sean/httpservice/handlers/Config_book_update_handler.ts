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

export class Config_book_update_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let id = this.getreqdata(msg, "id");


            var bookconfig: TConfigBook = await TConfigBook.findByPk(id);
            if (id != "" && bookconfig == null) {
                this.sendResult(res, { "error": 1, "data": "找不到id为" + id + "的数据" });
                return;
            }
            var isnew: boolean = false;
            if (id =="") {
                bookconfig = new TConfigBook();
                isnew = true;
            }
            bookconfig.platformid = this.getreqdata(msg, "platformid");
            bookconfig.pname = this.getreqdata(msg, "pname");
            bookconfig.host = this.getreqdata(msg, "host");
            bookconfig.searchstr = this.getreqdata(msg, "searchstr");
            bookconfig.searchinfo = this.getreqdata(msg, "searchinfo");
            bookconfig.searchpage = this.getreqdata(msg, "searchpage");
            bookconfig.chapterpage = this.getreqdata(msg, "chapterpage");
            bookconfig.chapterselect = this.getreqdata(msg, "chapterselect");
            bookconfig.infotitle = this.getreqdata(msg, "infotitle");
            bookconfig.infooption1 = this.getreqdata(msg, "infooption1");
            bookconfig.infooption2 = this.getreqdata(msg, "infooption2");
            bookconfig.infotext = this.getreqdata(msg, "infotext");
            bookconfig.updatedAt = new Date();
            bookconfig.save();

            await SequelizeMgr.instance.configSQL.initBookConfig();

            this.sendResult(res, { "error": 0, "data": isnew ? "保存成功" : "更新成功" });
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
    protected getreqdata(msg, info): any {
        return msg[info] || "";
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