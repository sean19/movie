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
import {TestCrawler} from "../../crawler/TestCrawler";

export class Get_movie_1_2_1_SearchDataHandler2 extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {
        // try {
        var msg = JSON.parse(datastr);
        let keyword = msg.keyword || '';
        let platform = msg.platform || '';
        let type = msg.type || '';
        let save = msg.save || '';
        console.log(platform,type,save);
        var conf =  ConfigMgr.instance.getConfig("movie_"+platform);

        if(conf){
            var webcontent = await TestCrawler.i.getUrlData(conf["host"]);
            var obj = {};
            if(res){
                obj["tj"] = new WebCrawler().getResult(webcontent,conf["main"]["tj"],conf["host"]);
                obj["option"]  = new WebCrawler().getResult(webcontent,conf["main"]["option"],conf["host"]);

            }
            this.sendResult(res,{ "error":0,"platform":platform,"data": obj });
        }else{
            this.sendResult(res,{ "error":1,"platform":platform,"data": '' });
        }


    }
    protected sendResult(res:Response,result:object):void{
        res.setHeader("Access-Control-Allow-Origin","*");
        res.json(result);
    }


}