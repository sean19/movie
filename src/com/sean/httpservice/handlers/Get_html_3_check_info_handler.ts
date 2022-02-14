import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { Request, Response } from "express";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { WebCrawler } from "../../crawler/WebCrawler";


export class Get_html_3_check_info_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let selector = msg.selector || '';
            let name = msg.name || '';
            let path = msg.path || '';
            let att = msg.att || '';
            let deel = msg.deel || '';
            let body = msg.body || '';
            let child = msg.child || '';
            let datatype = msg.datatype || '';
            let host = msg.host || "";

            var wc = new WebCrawler();
            var data = wc.getinfodata(body, datatype,selector, child, name, path, att, deel);


            if (!data|| data == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            } else {
                this.sendResult(res, { "error": 0, "length": data['length'], "data": data });

            }
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": err.toString() });

        }
    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}