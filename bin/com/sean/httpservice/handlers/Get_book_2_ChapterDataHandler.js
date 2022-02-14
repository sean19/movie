"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_book_2_ChapterDataHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TestCrawler_1 = require("../../crawler/TestCrawler");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
const TConfigBook_1 = require("../../sqlTable/TConfigBook");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_book_2_ChapterDataHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let link = msg.link || '';
            let platform = msg.platform || '';
            console.log("【0】获取章节资源：" + link);
            if (link == "") {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '找不到信息' });
                return;
                ;
            }
            var restring = await TestCrawler_1.TestCrawler.i.getUrlData(link, "章节");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "platform": platform, "data": '找不到信息' });
                return;
                ;
            }
            var configbook = await TConfigBook_1.TConfigBook.findByPk(platform);
            var cpageid = Number(configbook.chapterpage);
            var listid = Number(configbook.chapterselect);
            var selecterpage = await TConfigSelector_1.TConfigSelector.findByPk(cpageid);
            var selectpageselect = await TConfigSelector_1.TConfigSelector.findByPk(listid);
            var data = {};
            data["pageList"] = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selecterpage.datatype, selecterpage.selector, selecterpage.getattribsarr(), configbook.host);
            data["pageSelect"] = new WebCrawler_1.WebCrawler().getinfodatalist(restring, selecterpage.datatype, selectpageselect.selector, selectpageselect.getattribsarr(), configbook.host);
            this.sendResult(res, { "error": 0, "data": data });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.message });
        }
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.Get_book_2_ChapterDataHandler = Get_book_2_ChapterDataHandler;
//# sourceMappingURL=Get_book_2_ChapterDataHandler.js.map