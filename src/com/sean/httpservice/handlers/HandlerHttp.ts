import {Request, Response} from "express";
import {ErrorMgr} from "../ErrorMgr/ErrorMgr";
import {SysModifyLog} from "../../sqlTable/SysModifyLog";

export class HandlerHttp
{
    path: string;
    type: string;
    constructor( path:string, type:string="GET" )
    {
        this.path = path;
        this.type = type;
    }
    public handl(req:Request, res:Response):void
    {

        try{
            var re : any = req;
                this.deel(req,res);
            if(re.session.admin){
                // this.setModifyLog(re.session.admin.id,re.session.admin.userName, this.path,"action",0);
            }
        }catch (e) {
            ErrorMgr.instance.onerr(e);
        }
    }
    protected deel(req:Request, res:Response):void
    {
        this.exec(req, res);
    }
    public exec(req:Request,  res:Response ):void
    {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    //create a modify log in sql
    protected setModifyLog(userId:number,userName:string,tableName:string,action:string,itemId:number):void
    {
        var uid:string = userId+"";
        var log:SysModifyLog = new SysModifyLog();
        log.userId=userId+"";
        log.tableName=tableName;
        log.action=action;
        log.itemId=itemId;
        log.save();
    }

    /**
     * @getClientIP
     * @desc 获取用户 ip 地址
     * @param {Object} req - 请求
     */
    public  getClientIP(req):string {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};
}