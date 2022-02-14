import {Request, Response} from "express";
import {HttpConfig} from "../HttpConfig";
import {HandlerHttp} from "./HandlerHttp";

export class HandlerNeedLogin extends HandlerHttp
{
    public req:any;
    public deel(req:Request, res:Response):void
    {
        if(this.isLogin(req,res)) {

            this.exec(req, res);
        }
    }
    protected isLogin(req:any,res:Response):boolean{
        if(req.session.admin == null)
        {
            res.json({error:HttpConfig.NotLogin});
            return false;
        }
        if( Date.now()- req.session.admin.time>=HttpConfig.SesionTime){
            res.json({error:HttpConfig.NotLogin});
            return false;
        }

        return true;
    }
    public exec( req:Request, res:Response ):void
    {
        this.req = req;
        res.setHeader('Access-Control-Allow-Origin', '*');

    }
}