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
import { WebCrawler } from "../../crawler/WebCrawler";
import { TConfigClawer } from "../../sqlTable/TConfigClawer";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";

export class Get_book_1_1_SearchDataHandler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {


            var msg = JSON.parse(datastr);
            let keyword = msg.keyword || '';
            let platform = msg.platform || '';
            let type = msg.type || '';
            let save = msg.save || '';
            let page = msg.page || '';

            if (platform == "") {
                platform = 1;
            }
            console.log(platform, type, save);
            var configbook: TConfigBook = await TConfigBook.findByPk(platform);
            var urldata: any = this.getBooURI(configbook, keyword, page);
            console.log("【0】获取搜索资源：" + urldata);
            var restring = restring = await TestCrawler.i.getUrlData(urldata, "搜索");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '搜索失败！请再次尝试' });
                return;
            }
            // var data = BookAnlysis.getBookData(platform, restring);

            var wc: WebCrawler = new WebCrawler();
            var selectorsearch: TConfigSelector = await TConfigSelector.findByPk(Number(configbook.searchinfo));
            var selectorpage: TConfigSelector = await TConfigSelector.findByPk(Number(configbook.searchpage));
            if (!selectorsearch == null || selectorpage == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '找不到选择器' });
                return;
            }
            var data = {};
            data["search"] = wc.getinfodatalist(restring, selectorsearch.datatype, selectorsearch.selector, selectorsearch.getattribsarr(), configbook.host, configbook.platformid);
            data["page"] = wc.getinfodatalist(restring, selectorsearch.datatype, selectorpage.selector, selectorpage.getattribsarr(), configbook.host, platform);
            // data["page"] = wc.getResult(res, JSON.parse(configbook.searchpage), BookConfig.conf_book1["host"]);






            if (data) {
                if (data['page']) {
                    if (data['page'][0] != null) {
                        for (var i: number = 0; i < data['page'].length; i++) {
                            if (data['page'][i] != null) {
                                data['page'][i]['kw'] = keyword;
                                var hf: string = data['page'][i]['link'];
                                var pg = hf.substring(hf.lastIndexOf('=') + 1, hf.length);
                                if (!Number(pg)) {
                                    pg = "";
                                }
                                data['page'][i]['page'] = pg;
                            }
                        }
                    }
                }
                this.sendResult(res, { "error": 0, "platform": platform, "data": data });
            } else {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '' });
            }
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }
    }
    protected getBooURI(configbook: TConfigBook, keyword: string, page: string): any {
        var uri: string = "";
        var urlencode = require('urlencode');
        var chartset = "utf-8";
        // switch (platform) {
        //     case "1":

        //         return uri;
        //         break;
        //     case "2":
        //         uri = BookConfig.conf_book2["host"] + (keyword ? "modules/article/search.php?q=" + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
        //         return uri;
        //         break;
        // }
        uri = configbook.host + (keyword ? configbook.searchstr + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
        return uri;
    }
    protected sendResult(res: Response, result: object): void {
        console.log("发送结果：" + result["error"]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}