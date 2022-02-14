import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { Request, Response } from "express";
import { TestCrawler } from "../../crawler/TestCrawler";


export class Get_html_1_data_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let keyword = msg.keyword || '';
            let restring = await TestCrawler.i.getUrlData(keyword, "html");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            } else {
                this.sendResult(res, { "error": 0, "data": restring });

            }
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": err });

        }
    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}