"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_movie_2_InfoDataHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TConfigMovie_1 = require("../../sqlTable/TConfigMovie");
const TestCrawler_1 = require("../../crawler/TestCrawler");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_movie_2_InfoDataHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let link = msg.link || '';
            let platform = msg.platform || '';
            var configmovie = await TConfigMovie_1.TConfigMovie.findByPk(1);
            console.log("【0】获取搜索资源：" + link);
            var restring = restring = await TestCrawler_1.TestCrawler.i.getUrlData(link, "搜索");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '搜索失败！请再次尝试' });
                return;
            }
            var selectorsearch = await TConfigSelector_1.TConfigSelector.findByPk(Number(configmovie.playlist));
            var data = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selectorsearch.datatype, selectorsearch.selector, selectorsearch.getattribsarr(), configmovie.host);
            var dd = data[0];
            // new M3u8Clawer().loadm3u8(dd['m3u8']);//下载模块
            // var movieVO: MovieConfigVO = ConfigMgr.instance.getConfig("movie_" + platform);
            if (data) {
                // var sc: MovieClawer = new MovieClawer();
                // var sr: MovieVO[] = await sc.getInfoMovieVOS(link, movieVO);
                this.sendResult(res, { "error": 0, "data": data });
            }
            else {
                this.sendResult(res, { "error": 1, "data": '数据错误' });
            }
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.Get_movie_2_InfoDataHandler = Get_movie_2_InfoDataHandler;
//# sourceMappingURL=Get_movie_2_InfoDataHandler.js.map