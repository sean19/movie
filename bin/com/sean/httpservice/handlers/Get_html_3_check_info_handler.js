"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_html_3_check_info_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const WebCrawler_1 = require("../../crawler/WebCrawler");
class Get_html_3_check_info_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let selector = msg.selector || '';
            let name = msg.name || '';
            let path = msg.path || '';
            let att = msg.att || '';
            let deel = msg.deel || '';
            let body = msg.body || '';
            let child = msg.child || '';
            let datatype = msg.datatype || '';
            let host = msg.host || "";
            var wc = new WebCrawler_1.WebCrawler();
            var data = wc.getinfodata(body, datatype, selector, child, name, path, att, deel);
            if (!data || data == null) {
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
exports.Get_html_3_check_info_handler = Get_html_3_check_info_handler;
//# sourceMappingURL=Get_html_3_check_info_handler.js.map