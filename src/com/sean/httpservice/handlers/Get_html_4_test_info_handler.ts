import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { Request, Response } from "express";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { WebCrawler } from "../../crawler/WebCrawler";


export class Get_html_4_test_info_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let url = msg.url || '';
            let selector = msg.selector || '';
            let datatype = msg.datatype || '';
            let attribs = msg.attribs || '';


            let restring = await TestCrawler.i.getUrlData(url, "testsearch");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "data": "找不到网页数据" });
                return;
            }
            var wc = new WebCrawler();
            var data = wc.getinfodatalist(restring,datatype, selector, attribs);


            if (data == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            } else {
                this.sendResult(res, { "error": 0, "length": data['length'], "data": data });

            }
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.toString() });

        }

    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}