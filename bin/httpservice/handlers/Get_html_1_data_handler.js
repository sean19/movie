"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_html_1_data_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TestCrawler_1 = require("../../crawler/TestCrawler");
class Get_html_1_data_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let keyword = msg.keyword || '';
            let restring = await TestCrawler_1.TestCrawler.i.getUrlData(keyword, "html");
            if (restring == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            }
            else {
                this.sendResult(res, { "error": 0, "data": restring });
            }
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err });
        }
    }
    sendResult(res, result) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
}
exports.Get_html_1_data_handler = Get_html_1_data_handler;
//# sourceMappingURL=Get_html_1_data_handler.js.map