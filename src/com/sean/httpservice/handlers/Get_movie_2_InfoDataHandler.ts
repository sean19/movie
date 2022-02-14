import { Request, Response } from "express";
import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { MovieVO } from "../util/VO/MovieVO";
import { MovieClawer } from "../util/movie/MovieClawer";
import { ConfigMgr } from "../../ConfigMgr";
import { MovieConfigVO } from "../util/VO/MovieConfigVO";
import { TConfigMovie } from "../../sqlTable/TConfigMovie";
import { TestCrawler } from "../../crawler/TestCrawler";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";
import { WebCrawler } from "../../crawler/WebCrawler";
import { M3u8Clawer } from "../util/movie/M3u8Clawer";

export class Get_movie_2_InfoDataHandler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {


            var msg = JSON.parse(datastr);
            let link = msg.link || '';
            let platform = msg.platform || '';

            var configmovie: TConfigMovie = await TConfigMovie.findByPk(1);

            console.log("【0】获取搜索资源：" + link);
            var restring = restring = await TestCrawler.i.getUrlData(link, "搜索");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '搜索失败！请再次尝试' });
                return;
            }
            var selectorsearch: TConfigSelector = await TConfigSelector.findByPk(Number(configmovie.playlist));
            var data = new WebCrawler().getinfodatalist(restring,selectorsearch.datatype, selectorsearch.selector, selectorsearch.getattribsarr(), configmovie.host);
            var dd = data[0];
            // new M3u8Clawer().loadm3u8(dd['m3u8']);//下载模块
            // var movieVO: MovieConfigVO = ConfigMgr.instance.getConfig("movie_" + platform);
            if (data) {
                // var sc: MovieClawer = new MovieClawer();
                // var sr: MovieVO[] = await sc.getInfoMovieVOS(link, movieVO);
                this.sendResult(res, { "error": 0, "data": data });
            } else {
                this.sendResult(res, { "error": 1, "data": '数据错误' });
            }
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }
    }
    protected sendResult(res: Response, result: object): void {
        res.json(result);
    }


}