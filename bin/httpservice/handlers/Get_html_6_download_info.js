"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_html_6_download_info = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
class Get_html_6_download_info extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let id = Number(msg.id || '0');
            var config = await TConfigSelector_1.TConfigSelector.findByPk(id);
            if (config == null) {
                this.sendResult(res, { "error": 1, "data": "找不到【" + id + "】的数据" });
            }
            else {
                this.sendResult(res, { "error": 0, "data": config });
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
exports.Get_html_6_download_info = Get_html_6_download_info;
//# sourceMappingURL=Get_html_6_download_info.js.map