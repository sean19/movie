"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_movie_1_2_1_SearchDataHandler2 = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const ConfigMgr_1 = require("../../ConfigMgr");
const WebCrawler_1 = require("../../crawler/WebCrawler");
const TestCrawler_1 = require("../../crawler/TestCrawler");
class Get_movie_1_2_1_SearchDataHandler2 extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        // try {
        var msg = JSON.parse(datastr);
        let keyword = msg.keyword || '';
        let platform = msg.platform || '';
        let type = msg.type || '';
        let save = msg.save || '';
        console.log(platform, type, save);
        var conf = ConfigMgr_1.ConfigMgr.instance.getConfig("movie_" + platform);
        if (conf) {
            var webcontent = await TestCrawler_1.TestCrawler.i.getUrlData(conf["host"]);
            var obj = {};
            if (res) {
                obj["tj"] = new WebCrawler_1.WebCrawler().getResult(webcontent, conf["main"]["tj"], conf["host"]);
                obj["option"] = new WebCrawler_1.WebCrawler().getResult(webcontent, conf["main"]["option"], conf["host"]);
            }
            this.sendResult(res, { "error": 0, "platform": platform, "data": obj });
        }
        else {
            this.sendResult(res, { "error": 1, "platform": platform, "data": '' });
        }
    }
    sendResult(res, result) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
}
exports.Get_movie_1_2_1_SearchDataHandler2 = Get_movie_1_2_1_SearchDataHandler2;
//# sourceMappingURL=Get_movie_1_2_1_SearchDataHandler2.js.map