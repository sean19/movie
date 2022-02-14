import { Request, Response } from "express";
import {HandlerNotNeedLogin} from "./HandlerNotNeedLogin";
import {MovieVO} from "../util/VO/MovieVO";
import {RecordSearch} from "../../sqlTable/RecordSearch";
import {MovieClawer} from "../util/movie/MovieClawer";
import {ConfigMgr} from "../../ConfigMgr";
import {MovieConfigVO} from "../util/VO/MovieConfigVO";
import {MovieEngin} from "../util/movie/engin/MovieEngin";
import {MovieData} from "../util/movie/engin/MovieData";
import {TMovieSee} from "../../sqlTable/TMovieSee";
import {Sequelize} from "sequelize";
import {DemocCrawler} from "../../crawler/DemocCrawler";
import {WebCrawler} from "../../crawler/WebCrawler";

export class Get_movie_1_2_2_OptionDataHandler2 extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {
        // try {
        var msg = JSON.parse(datastr);
        let platform = msg.platform || '';
        let title = msg.title || '';
        let url = msg.url || '';
        console.log(platform,url);
        var conf =  ConfigMgr.instance.getConfig("movie_"+platform);

        if(conf){
            var webcontent = await new DemocCrawler().crawFromUrl(url);
            var obj = {};
            if(res){
                obj["tj"] = new WebCrawler().getResult(webcontent,conf["sub"]["tj"],conf["host"]);
                obj["option"]  = new WebCrawler().getResult(webcontent,conf["sub"]["option"],conf["host"]);

            }
            this.sendResult(res,{ "error":0,"platform":platform,"data": obj,title:title });
        }else{
            this.sendResult(res,{ "error":1,"platform":platform,"data": '' });
        }


    }
    protected sendResult(res:Response,result:object):void{
        res.setHeader("Access-Control-Allow-Origin","*");
        res.json(result);
    }


}