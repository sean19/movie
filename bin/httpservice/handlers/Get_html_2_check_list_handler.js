"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_html_2_check_list_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_html_2_check_list_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let selector = msg.selector || '';
            let body = msg.body || '';
            let host = msg.host || "";
            var wc = new WebCrawler_1.WebCrawler();
            var data = wc.getlistdata(body, selector);
            if (data == null || data['length'] == 0) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
            }
            else {
                this.sendResult(res, { "error": 0, "length": data['length'], "data": data.html() });
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
exports.Get_html_2_check_list_handler = Get_html_2_check_list_handler;
//# sourceMappingURL=Get_html_2_check_list_handler.js.map