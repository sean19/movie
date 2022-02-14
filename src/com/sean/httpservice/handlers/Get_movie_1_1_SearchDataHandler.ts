import { Request, Response } from "express";
import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { MovieVO } from "../util/VO/MovieVO";
import { RecordSearch } from "../../sqlTable/RecordSearch";
import { MovieClawer } from "../util/movie/MovieClawer";
import { ConfigMgr } from "../../ConfigMgr";
import { MovieConfigVO } from "../util/VO/MovieConfigVO";
import { MovieEngin } from "../util/movie/engin/MovieEngin";
import { TConfigMovie } from "../../sqlTable/TConfigMovie";
import { TestCrawler } from "../../crawler/TestCrawler";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";
import { WebCrawler } from "../../crawler/WebCrawler";

export class Get_movie_1_1_SearchDataHandler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let keyword = msg.keyword || '';
            let platform = msg.platform || '';
            let type = msg.type || '';
            let save = msg.save || '';

            var configmovie: TConfigMovie = await TConfigMovie.findByPk(platform);
            var urldata: any = this.getMovieURI(configmovie, keyword);

            console.log("【0】获取搜索资源：" + urldata);
            var restring = restring = await TestCrawler.i.getUrlData(urldata, "搜索");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '搜索失败！请再次尝试' });
                return;
            }
            var selectorsearch: TConfigSelector = await TConfigSelector.findByPk(Number(configmovie.searchinfo));
            var data = new WebCrawler().getinfodatalist(restring,selectorsearch.datatype, selectorsearch.selector, selectorsearch.getattribsarr(), configmovie.host);

            this.sendResult(res, { "error": 0, "platform": platform, "data": data });
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });

        }
    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
    protected getMovieURI(configbook: TConfigMovie, keyword: string): any {
        var uri: string = "";
        var urlencode = require('urlencode');
        var chartset = "utf-8";
        keyword = urlencode(keyword, chartset)
        var searchstr: string = configbook.searchstr.replace("***", keyword)
        // searchstr = urlencode(searchstr, chartset)
        uri = configbook.host + searchstr;
        return uri;
    }

}