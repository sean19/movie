"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_book_2_InfoDataHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TestCrawler_1 = require("../../crawler/TestCrawler");
const WebCrawler_1 = require("../../crawler/WebCrawler");
const TConfigBook_1 = require("../../sqlTable/TConfigBook");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
class Get_book_2_InfoDataHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let link = msg.link || '';
            let platform = msg.platform || '';
            console.log("【0】获取内容资源：" + link);
            var restring = await TestCrawler_1.TestCrawler.i.getUrlData(link, "内容");
            // data["pageText"] = wc.getResult(res, JSON.parse(configbook.infotext), BookConfig.conf_book1["host"]);
            // data["textOption"] = wc.getResult(res, JSON.parse(configbook.infooption), BookConfig.conf_book1["host"]);
            // data["chapterTitle"] = wc.getResult(res, JSON.parse(configbook.infotitle), BookConfig.conf_book1["host"]);
            var configbook = await TConfigBook_1.TConfigBook.findByPk(platform);
            var selector_info = await TConfigSelector_1.TConfigSelector.findByPk(Number(configbook.infotext));
            var selector_title = await TConfigSelector_1.TConfigSelector.findByPk(Number(configbook.infotitle));
            var selector_option1 = await TConfigSelector_1.TConfigSelector.findByPk(Number(configbook.infooption1));
            var selector_option2 = await TConfigSelector_1.TConfigSelector.findByPk(Number(configbook.infooption2));
            var data = {};
            data["pageText"] = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selector_title.datatype, selector_info.selector, selector_info.getattribsarr(), configbook.host);
            data["chapterTitle"] = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selector_title.datatype, selector_title.selector, selector_title.getattribsarr(), configbook.host);
            data["textOption1"] = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selector_title.datatype, selector_option1.selector, selector_option1.getattribsarr(), configbook.host);
            data["textOption2"] = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selector_title.datatype, selector_option2.selector, selector_option2.getattribsarr(), configbook.host);
            // var data = BookAnlysis.getBookInfo(platform, restring);
            if (data) {
                this.sendResult(res, { "error": 0, "data": data });
            }
            else {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '' });
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
exports.Get_book_2_InfoDataHandler = Get_book_2_InfoDataHandler;
//# sourceMappingURL=Get_book_2_InfoDataHandler.js.map