import { Request, Response } from "express";
import {HandlerNotNeedLogin} from "./HandlerNotNeedLogin";
import {MovieVO} from "../util/VO/MovieVO";
import {MovieClawer} from "../util/movie/MovieClawer";
import {ConfigMgr} from "../../ConfigMgr";
import {MovieConfigVO} from "../util/VO/MovieConfigVO";
import {TestCrawler} from "../../crawler/TestCrawler";
import {BookAnlysis} from "../util/BookAnlysis";
import {TMovieTJ} from "../../sqlTable/TMovieTJ";

export class Movie_tuijian_get extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {

        var msg = JSON.parse(datastr);
        let tjm = msg.tjm || '';
        var data;
        if(tjm){
            data = await TMovieTJ.findOne({where:{tjm:tjm}});
        }else{
            var tjlist:TMovieTJ[] = await TMovieTJ.findAll();
            data = tjlist[tjlist.length-1];
        }

        if(data){
            this.sendResult(res,{ "error":0,"data": data});
        }else{
            this.sendResult(res,{ "error":1,"platform":"","data": '' });
        }




    }
    protected sendResult(res:Response,result:object):void{
        res.json(result);
    }


}