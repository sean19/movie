"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_movie_1_2_2_OptionDataHandler2 = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const ConfigMgr_1 = require("../../ConfigMgr");
const DemocCrawler_1 = require("../../crawler/DemocCrawler");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_movie_1_2_2_OptionDataHandler2 extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        // try {
        var msg = JSON.parse(datastr);
        let platform = msg.platform || '';
        let title = msg.title || '';
        let url = msg.url || '';
        console.log(platform, url);
        var conf = ConfigMgr_1.ConfigMgr.instance.getConfig("movie_" + platform);
        if (conf) {
            var webcontent = await new DemocCrawler_1.DemocCrawler().crawFromUrl(url);
            var obj = {};
            if (res) {
                obj["tj"] = new WebCrawler_1.WebCrawler().getResult(webcontent, conf["sub"]["tj"], conf["host"]);
                obj["option"] = new WebCrawler_1.WebCrawler().getResult(webcontent, conf["sub"]["option"], conf["host"]);
            }
            this.sendResult(res, { "error": 0, "platform": platform, "data": obj, title: title });
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
exports.Get_movie_1_2_2_OptionDataHandler2 = Get_movie_1_2_2_OptionDataHandler2;
//# sourceMappingURL=Get_movie_1_2_2_OptionDataHandler2.js.map