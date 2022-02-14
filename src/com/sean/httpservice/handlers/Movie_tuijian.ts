import { Request, Response } from "express";
import {HandlerNotNeedLogin} from "./HandlerNotNeedLogin";
import {MovieVO} from "../util/VO/MovieVO";
import {MovieClawer} from "../util/movie/MovieClawer";
import {ConfigMgr} from "../../ConfigMgr";
import {MovieConfigVO} from "../util/VO/MovieConfigVO";
import {TestCrawler} from "../../crawler/TestCrawler";
import {BookAnlysis} from "../util/BookAnlysis";
import {TMovieTJ} from "../../sqlTable/TMovieTJ";

export class Movie_tuijian extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {

        var msg = JSON.parse(datastr);
        let movieOrgurl = msg.movieOrgurl || '';
        let movieurl = msg.movieurl || '';
        let platform = msg.platform || '';
        let title = msg.title || '';
        let tjm = msg.tjm || '';
        if(!tjm || tjm==""){
            tjm = Math.floor(Math.random()*10000)+"";
        }

        var tm:TMovieTJ = new TMovieTJ();
        tm.title=title;
        tm.platform=platform;
        tm.movieurl=movieurl;
        tm.movieOrgurl=movieOrgurl;
        tm.tjm=tjm;
        await tm.save();
        var data={};
        if(data){
            this.sendResult(res,{ "error":0,"data": data });
        }else{
            this.sendResult(res,{ "error":1,"platform":platform,"data": '' });
        }




    }
    protected sendResult(res:Response,result:object):void{
        res.json(result);
    }


}