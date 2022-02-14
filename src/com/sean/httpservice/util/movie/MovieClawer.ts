import {UtillHttpSuperagent} from "../../../crawler/utillHttp/UtillHttpSuperagent";
import {UtillQueryData} from "../../../crawler/utillHttp/UtillQueryData";
import {MovieVO} from "../VO/MovieVO";
import {UtillMovie} from "./UtillMovie";
import {ConfigMgr} from "../../../ConfigMgr";
import {MovieConfigVO} from "../VO/MovieConfigVO";
import {SelectorBase} from "./selector/SelectorBase";
import { MovieSelectorLL} from "./selector/MovieSelectorLL";
import {MovieSelectorM11} from "./selector/MovieSelectorM11";
import {MovieSelectorMJTT} from "./selector/MovieSelectorMJTT";
import {MovieSelectorMZP} from "./selector/MovieSelectorMZP";
import {DemocCrawler} from "../../../crawler/DemocCrawler";
import {MovieSelectorTVHAO5} from "./selector/MovieSelectorTVHAO5";
import {UserAgent} from "../VO/UserAgent";
import {MovieSelectorHJ} from "./selector/MovieSelectorHJ";
import {MovieSelectorWXTV} from "./selector/MovieSelectorWXTV";
import {TestCrawler} from "../../../crawler/TestCrawler";

export class MovieClawer {
    public static url_mjtt:string = "https://m.zanpian.cc";
    public static url_www:string = "https://www.zanpian.cc";

    protected static url_search:string = "/vod-search-wd-";
    public async getSearchMovieVOS(keyWord:string,movieConfigVO:MovieConfigVO,type:string):Promise<MovieVO[]>{
        var targetUrl:string = UtillMovie.getTargetSearchURL(keyWord,movieConfigVO,type);
        var res = await TestCrawler.i.getUrlData(targetUrl);
        var selector = this.getSelector(movieConfigVO.id);
        var m11kArr:MovieVO[] = selector.getMovieSearchVOArr(res,movieConfigVO);
        return m11kArr;
    }
    public async getInfoMovieVOS(link:string,movieConfigVO:MovieConfigVO):Promise<MovieVO[]>{
        var targetUrl:string = UtillMovie.getTargetInfoURL(link,movieConfigVO);
        var res = await TestCrawler.i.getUrlData(targetUrl);
        var selector = this.getSelector(movieConfigVO.id);
        var m11kArr:MovieVO[] = selector.getMovieInfoVOArr(res);
        return m11kArr;
    }
    public async getSeeMovieVO(link:string,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
        var targetUrl:string = UtillMovie.getTargetSeeURL(link,movieConfigVO);
        var res = await TestCrawler.i.getUrlData(targetUrl)//,UserAgent.paw);
        var selector = this.getSelector(movieConfigVO.id);
        var mvo:MovieVO = await selector.getMovieSeeVO(link,res,movieConfigVO);
        return mvo;
    }
    protected getSelector(id:null):SelectorBase{
        var selector:SelectorBase= null;
        switch (id) {
            case 4:
                selector = new MovieSelectorLL();
                break;
            case 1:
                selector = new MovieSelectorM11();
                break;
            case 2:
                selector = new MovieSelectorMJTT();
                break;
            case 3:
                selector = new MovieSelectorMZP();
                break;
            case 5:
                selector = new MovieSelectorHJ();
                break;
            case 6:
                selector = new MovieSelectorWXTV();
                break;
            case 100:
                selector = new MovieSelectorTVHAO5();
                break;
        }
        return   selector;
    }
}
