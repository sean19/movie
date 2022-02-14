"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_html_4_test_info_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TestCrawler_1 = require("../../crawler/TestCrawler");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_html_4_test_info_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let url = msg.url || '';
            let selector = msg.selector || '';
            let datatype = msg.datatype || '';
            let attribs = msg.attribs || '';
            let restring = await TestCrawler_1.TestCrawler.i.getUrlData(url, "testsearch");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "data": "找不到网页数据" });
                return;
            }
            var wc = new WebCrawler_1.WebCrawler();
            var data = wc.getinfodatalist(restring, datatype, selector, attribs);
            if (data == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            }
            else {
                this.sendResult(res, { "error": 0, "length": data['length'], "data": data });
            }
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err.toString() });
        }
    }
    sendResult(res, result) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
}
exports.Get_html_4_test_info_handler = Get_html_4_test_info_handler;
//# sourceMappingURL=Get_html_4_test_info_handler.js.map