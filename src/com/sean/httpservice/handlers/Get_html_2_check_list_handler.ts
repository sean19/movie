import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { Request, Response } from "express";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { WebCrawler } from "../../crawler/WebCrawler";


export class Get_html_2_check_list_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {

            var msg = JSON.parse(datastr);
            let selector = msg.selector || '';


            let body = msg.body || '';
            let host = msg.host || "";

            var wc = new WebCrawler();
            var data = wc.getlistdata(body, selector);


            if (data == null || data['length'] == 0) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            } else {
                this.sendResult(res, { "error": 0, "length": data['length'], "data": data.html() });

            }
        } catch (err) {
            this.sendResult(res, { "error": 1,  "data": err });

        }
    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}