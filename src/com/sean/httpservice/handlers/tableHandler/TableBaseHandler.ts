import {Request, Response} from "express";
import {UtlHttp} from "../../util/UtlHttp";
import {HandlerHttp} from "../HandlerHttp";

export class TableBaseHandler extends HandlerHttp{
    protected  tableName:string = "";
    protected userName:string;
    protected userId:number;
    protected primaryKey:string;
    exec(req:Request, res:Response):void {
        super.exec(req, res);
        var postdata = "";
        let self = this;
        req.on("data", function (data) {
            postdata += data;
        });
        req.on("end", function () {
            var datastr = decodeURIComponent(postdata);
            self.tableName = UtlHttp.getInfo(datastr,"tableName");
            self.primaryKey = UtlHttp.getInfo(datastr,"primaryKey");
            self.onGetData(res, datastr);
        });
    }
    protected onGetData(res:Response,datastr:string):void {
    }
}