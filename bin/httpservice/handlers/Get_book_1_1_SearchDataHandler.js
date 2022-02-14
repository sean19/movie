"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_book_1_1_SearchDataHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TestCrawler_1 = require("../../crawler/TestCrawler");
const TConfigBook_1 = require("../../sqlTable/TConfigBook");
const WebCrawler_1 = require("../../crawler/WebCrawler");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
class Get_book_1_1_SearchDataHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let keyword = msg.keyword || '';
            let platform = msg.platform || '';
            let type = msg.type || '';
            let save = msg.save || '';
            let page = msg.page || '';
            if (platform == "") {
                platform = 1;
            }
            console.log(platform, type, save);
            var configbook = await TConfigBook_1.TConfigBook.findByPk(platform);
            var urldata = this.getBooURI(configbook, keyword, page);
            console.log("【0】获取搜索资源：" + urldata);
            var restring = restring = await TestCrawler_1.TestCrawler.i.getUrlData(urldata, "搜索");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '搜索失败！请再次尝试' });
                return;
            }
            // var data = BookAnlysis.getBookData(platform, restring);
            var wc = new WebCrawler_1.WebCrawler();
            var selectorsearch = await TConfigSelector_1.TConfigSelector.findByPk(Number(configbook.searchinfo));
            var selectorpage = await TConfigSelector_1.TConfigSelector.findByPk(Number(configbook.searchpage));
            if (!selectorsearch == null || selectorpage == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '找不到选择器' });
                return;
            }
            var data = {};
            data["search"] = wc.getinfodatalist(restring, selectorsearch.datatype, selectorsearch.selector, selectorsearch.getattribsarr(), configbook.host, configbook.platformid);
            data["page"] = wc.getinfodatalist(restring, selectorsearch.datatype, selectorpage.selector, selectorpage.getattribsarr(), configbook.host, platform);
            // data["page"] = wc.getResult(res, JSON.parse(configbook.searchpage), BookConfig.conf_book1["host"]);
            if (data) {
                if (data['page']) {
                    if (data['page'][0] != null) {
                        for (var i = 0; i < data['page'].length; i++) {
                            if (data['page'][i] != null) {
                                data['page'][i]['kw'] = keyword;
                                var hf = data['page'][i]['link'];
                                var pg = hf.substring(hf.lastIndexOf('=') + 1, hf.length);
                                if (!Number(pg)) {
                                    pg = "";
                                }
                                data['page'][i]['page'] = pg;
                            }
                        }
                    }
                }
                this.sendResult(res, { "error": 0, "platform": platform, "data": data });
            }
            else {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '' });
            }
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }
    }
    getBooURI(configbook, keyword, page) {
        var uri = "";
        var urlencode = require('urlencode');
        var chartset = "utf-8";
        // switch (platform) {
        //     case "1":
        //         return uri;
        //         break;
        //     case "2":
        //         uri = BookConfig.conf_book2["host"] + (keyword ? "modules/article/search.php?q=" + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
        //         return uri;
        //         break;
        // }
        uri = configbook.host + (keyword ? configbook.searchstr + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
        return uri;
    }
    sendResult(res, result) {
        console.log("发送结果：" + result["error"]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
}
exports.Get_book_1_1_SearchDataHandler = Get_book_1_1_SearchDataHandler;
//# sourceMappingURL=Get_book_1_1_SearchDataHandler.js.map