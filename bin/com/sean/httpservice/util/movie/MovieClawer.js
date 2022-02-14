"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieClawer = void 0;
const UtillMovie_1 = require("./UtillMovie");
const MovieSelectorLL_1 = require("./selector/MovieSelectorLL");
const MovieSelectorM11_1 = require("./selector/MovieSelectorM11");
const MovieSelectorMJTT_1 = require("./selector/MovieSelectorMJTT");
const MovieSelectorMZP_1 = require("./selector/MovieSelectorMZP");
const MovieSelectorTVHAO5_1 = require("./selector/MovieSelectorTVHAO5");
const MovieSelectorHJ_1 = require("./selector/MovieSelectorHJ");
const MovieSelectorWXTV_1 = require("./selector/MovieSelectorWXTV");
const TestCrawler_1 = require("../../../crawler/TestCrawler");
class MovieClawer {
    async getSearchMovieVOS(keyWord, movieConfigVO, type) {
        var targetUrl = UtillMovie_1.UtillMovie.getTargetSearchURL(keyWord, movieConfigVO, type);
        var res = await TestCrawler_1.TestCrawler.i.getUrlData(targetUrl);
        var selector = this.getSelector(movieConfigVO.id);
        var m11kArr = selector.getMovieSearchVOArr(res, movieConfigVO);
        return m11kArr;
    }
    async getInfoMovieVOS(link, movieConfigVO) {
        var targetUrl = UtillMovie_1.UtillMovie.getTargetInfoURL(link, movieConfigVO);
        var res = await TestCrawler_1.TestCrawler.i.getUrlData(targetUrl);
        var selector = this.getSelector(movieConfigVO.id);
        var m11kArr = selector.getMovieInfoVOArr(res);
        return m11kArr;
    }
    async getSeeMovieVO(link, movieConfigVO) {
        var targetUrl = UtillMovie_1.UtillMovie.getTargetSeeURL(link, movieConfigVO);
        var res = await TestCrawler_1.TestCrawler.i.getUrlData(targetUrl); //,UserAgent.paw);
        var selector = this.getSelector(movieConfigVO.id);
        var mvo = await selector.getMovieSeeVO(link, res, movieConfigVO);
        return mvo;
    }
    getSelector(id) {
        var selector = null;
        switch (id) {
            case 4:
                selector = new MovieSelectorLL_1.MovieSelectorLL();
                break;
            case 1:
                selector = new MovieSelectorM11_1.MovieSelectorM11();
                break;
            case 2:
                selector = new MovieSelectorMJTT_1.MovieSelectorMJTT();
                break;
            case 3:
                selector = new MovieSelectorMZP_1.MovieSelectorMZP();
                break;
            case 5:
                selector = new MovieSelectorHJ_1.MovieSelectorHJ();
                break;
            case 6:
                selector = new MovieSelectorWXTV_1.MovieSelectorWXTV();
                break;
            case 100:
                selector = new MovieSelectorTVHAO5_1.MovieSelectorTVHAO5();
                break;
        }
        return selector;
    }
}
exports.MovieClawer = MovieClawer;
MovieClawer.url_mjtt = "https://m.zanpian.cc";
MovieClawer.url_www = "https://www.zanpian.cc";
MovieClawer.url_search = "/vod-search-wd-";
//# sourceMappingURL=MovieClawer.js.map