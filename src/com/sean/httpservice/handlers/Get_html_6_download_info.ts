import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { Request, Response } from "express";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { WebCrawler } from "../../crawler/WebCrawler";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";
import { TConfigBook } from "../../sqlTable/TConfigBook";


export class Get_html_6_download_info extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);

            let id: number = Number(msg.id || '0');


            var config: TConfigSelector = await TConfigSelector.findByPk(id);
            
            if (config == null) {
                this.sendResult(res, { "error": 1, "data": "找不到【"+id+"】的数据" });
            } else {
                this.sendResult(res, { "error": 0, "data": config });

            }
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err });

        }

    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}