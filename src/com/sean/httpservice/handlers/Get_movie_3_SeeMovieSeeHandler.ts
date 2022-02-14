import { Request, Response } from "express";
import {HandlerNotNeedLogin} from "./HandlerNotNeedLogin";
import {MovieVO} from "../util/VO/MovieVO";
import {RecordSee} from "../../sqlTable/RecordSee";
import {MovieConfigVO} from "../util/VO/MovieConfigVO";
import {ConfigMgr} from "../../ConfigMgr";
import {MovieClawer} from "../util/movie/MovieClawer";

export class Get_movie_3_SeeMovieSeeHandler extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {
        var msg = JSON.parse(datastr);
        let title = msg.title || '';
        let link = msg.link || '';

        let platform = msg.platform || '';
        var movieVO:MovieConfigVO = ConfigMgr.instance.getConfig("movie_"+platform);
        if(movieVO){
            var sc:MovieClawer = new MovieClawer();
            var sr:MovieVO = await sc.getSeeMovieVO(link,movieVO);
            this.sendResult(res,{ "error":0,"data": {playContent:sr.playContent} });
        }else{
            this.sendResult(res,{ "error":1,"data": '' });
        }

        if(title!=''){
            // RecordSee.checkRecord(movieVO.name,title,this.getClientIP(req));
        }
    }
    protected sendResult(res:Response,result:object):void{
        res.json(result);
    }


}