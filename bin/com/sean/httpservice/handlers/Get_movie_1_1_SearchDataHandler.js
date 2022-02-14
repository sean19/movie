"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_movie_1_1_SearchDataHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TConfigMovie_1 = require("../../sqlTable/TConfigMovie");
const TestCrawler_1 = require("../../crawler/TestCrawler");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_movie_1_1_SearchDataHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let keyword = msg.keyword || '';
            let platform = msg.platform || '';
            let type = msg.type || '';
            let save = msg.save || '';
            var configmovie = await TConfigMovie_1.TConfigMovie.findByPk(platform);
            var urldata = this.getMovieURI(configmovie, keyword);
            console.log("【0】获取搜索资源：" + urldata);
            var restring = restring = await TestCrawler_1.TestCrawler.i.getUrlData(urldata, "搜索");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '搜索失败！请再次尝试' });
                return;
            }
            var selectorsearch = await TConfigSelector_1.TConfigSelector.findByPk(Number(configmovie.searchinfo));
            var data = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selectorsearch.datatype, selectorsearch.selector, selectorsearch.getattribsarr(), configmovie.host);
            this.sendResult(res, { "error": 0, "platform": platform, "data": data });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }
    }
    sendResult(res, result) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
    getMovieURI(configbook, keyword) {
        var uri = "";
        var urlencode = require('urlencode');
        var chartset = "utf-8";
        keyword = urlencode(keyword, chartset);
        var searchstr = configbook.searchstr.replace("***", keyword);
        // searchstr = urlencode(searchstr, chartset)
        uri = configbook.host + searchstr;
        return uri;
    }
}
exports.Get_movie_1_1_SearchDataHandler = Get_movie_1_1_SearchDataHandler;
//# sourceMappingURL=Get_movie_1_1_SearchDataHandler.js.map