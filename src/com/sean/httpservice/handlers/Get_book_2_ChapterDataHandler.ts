import { Request, Response } from "express";
import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { MovieVO } from "../util/VO/MovieVO";
import { MovieClawer } from "../util/movie/MovieClawer";
import { ConfigMgr } from "../../ConfigMgr";
import { MovieConfigVO } from "../util/VO/MovieConfigVO";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";
import { TConfigBook } from "../../sqlTable/TConfigBook";
import { WebCrawler } from "../../crawler/WebCrawler";

export class Get_book_2_ChapterDataHandler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {

        try {


            var msg = JSON.parse(datastr);
            let link = msg.link || '';
            let platform = msg.platform || '';
            console.log("【0】获取章节资源：" + link);

            if (link == "") {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '找不到信息' });
                return;;
            }
            var restring = await TestCrawler.i.getUrlData(link, "章节");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '找不到信息' });
                return;;
            }
            var configbook: TConfigBook = await TConfigBook.findByPk(platform);
            var cpageid:number = Number(configbook.chapterpage)
            var listid:number = Number(configbook.chapterselect)
            var selecterpage: TConfigSelector = await TConfigSelector.findByPk(cpageid);
            var selectpageselect: TConfigSelector = await TConfigSelector.findByPk(listid);

            var data = {};
            data["pageList"] = new WebCrawler().getinfodatalist(restring, selecterpage.datatype,selecterpage.selector, selecterpage.getattribsarr(), configbook.host);
            data["pageSelect"] = new WebCrawler().getinfodatalist(restring, selecterpage.datatype,selectpageselect.selector, selectpageselect.getattribsarr(), configbook.host);

            this.sendResult(res, { "error": 0, "data": data });

        } catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }



    }
    protected sendResult(res: Response, result: object): void {
        res.json(result);
    }


}