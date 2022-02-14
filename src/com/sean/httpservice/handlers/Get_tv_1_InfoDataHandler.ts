import { Request, Response } from "express";
import {HandlerNotNeedLogin} from "./HandlerNotNeedLogin";
import {MovieVO} from "../util/VO/MovieVO";
import {MovieClawer} from "../util/movie/MovieClawer";
import {ConfigMgr} from "../../ConfigMgr";
import {MovieConfigVO} from "../util/VO/MovieConfigVO";

export class Get_tv_1_InfoDataHandler extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {

        var msg = JSON.parse(datastr);
        let platform = msg.platform || '';
        var movieVO:MovieConfigVO = ConfigMgr.instance.getConfig("movie_"+platform);
        if(movieVO){
            var sc:MovieClawer = new MovieClawer();
            var sr:MovieVO[] = await sc.getInfoMovieVOS("",movieVO);
            this.sendResult(res,{ "error":0,"data": sr });
        }else{
            this.sendResult(res,{ "error":1,"data": '' });
        }
    }
    protected sendResult(res:Response,result:object):void{
        res.json(result);
    }


}