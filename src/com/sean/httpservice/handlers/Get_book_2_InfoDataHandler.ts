import { Request, Response } from "express";
import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { MovieVO } from "../util/VO/MovieVO";
import { MovieClawer } from "../util/movie/MovieClawer";
import { ConfigMgr } from "../../ConfigMgr";
import { MovieConfigVO } from "../util/VO/MovieConfigVO";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { WebCrawler } from "../../crawler/WebCrawler";
import { TConfigBook } from "../../sqlTable/TConfigBook";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";

export class Get_book_2_InfoDataHandler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let link = msg.link || '';
            let platform = msg.platform || '';
            console.log("【0】获取内容资源：" + link);


            var restring = await TestCrawler.i.getUrlData(link, "内容");


            // data["pageText"] = wc.getResult(res, JSON.parse(configbook.infotext), BookConfig.conf_book1["host"]);
            // data["textOption"] = wc.getResult(res, JSON.parse(configbook.infooption), BookConfig.conf_book1["host"]);
            // data["chapterTitle"] = wc.getResult(res, JSON.parse(configbook.infotitle), BookConfig.conf_book1["host"]);
            var configbook: TConfigBook = await TConfigBook.findByPk(platform);
            var selector_info: TConfigSelector = await TConfigSelector.findByPk(Number(configbook.infotext));
            var selector_title: TConfigSelector = await TConfigSelector.findByPk(Number(configbook.infotitle));
            var selector_option1: TConfigSelector = await TConfigSelector.findByPk(Number(configbook.infooption1));
            var selector_option2: TConfigSelector = await TConfigSelector.findByPk(Number(configbook.infooption2));
            var data = {};
            data["pageText"] = new WebCrawler().getinfodatalist(restring,selector_title.datatype, selector_info.selector, selector_info.getattribsarr(), configbook.host);
            data["chapterTitle"] = new WebCrawler().getinfodatalist(restring,selector_title.datatype, selector_title.selector, selector_title.getattribsarr(), configbook.host);
            data["textOption1"] = new WebCrawler().getinfodatalist(restring,selector_title.datatype, selector_option1.selector, selector_option1.getattribsarr(), configbook.host);
            data["textOption2"] = new WebCrawler().getinfodatalist(restring,selector_title.datatype, selector_option2.selector, selector_option2.getattribsarr(), configbook.host);



            // var data = BookAnlysis.getBookInfo(platform, restring);

            if (data) {
                this.sendResult(res, { "error": 0, "data": data });
            } else {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '' });
            }


        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }

    }
    protected sendResult(res: Response, result: object): void {
        res.json(result);
    }


}