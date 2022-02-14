import {Request, Response} from "express";
import {HttpConfig} from "../HttpConfig";
import {HandlerHttp} from "./HandlerHttp";
import {UtlHttp} from "../util/UtlHttp";

export class HandlerNotNeedLogin extends HandlerHttp
{

    exec(req:Request, res:Response):void {
        super.exec(req, res);
        var postdata = "";
        let self = this;
        req.on("data", function (data) {
            postdata += data;
        });
        req.on("end", function () {
            try {
                var datastr = decodeURIComponent(postdata);
                self.onGetData(req,res,datastr);
            }catch (e) {
                self.onGetData(req,res,postdata);
            }

        });
    }
    protected onGetData(req:Request,res:Response, datastr:string):void {
    }
    protected sendResult(res: Response, result: object): void {
        console.log("发送结果：" + result["error"]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
}