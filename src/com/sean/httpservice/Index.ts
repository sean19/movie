import {HandlerNeedLogin} from "./handlers/HandlerNeedLogin";
import {Request, Response} from "express";

export class Index extends HandlerNeedLogin
{
    exec(req:Request, res:Response):void
    {
        super.exec( req, res );
        res.set("q","1");
        res.send("page");
    }
}