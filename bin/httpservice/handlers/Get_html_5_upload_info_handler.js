"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_html_5_upload_info_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TConfigSelector_1 = require("../../sqlTable/TConfigSelector");
const SequelizeMgr_1 = require("../../SequelizeMgr");
class Get_html_5_upload_info_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.id || '';
            let info = msg.info || '';
            let url = msg.url || '';
            let selector = msg.selector || '';
            let attribs = msg.attribs || '';
            var isnew = false;
            var config = await TConfigSelector_1.TConfigSelector.findByPk(id);
            if (id != "" && config == null) {
                this.sendResult(res, { "error": 1, "data": "找不到" + id + "的数据" });
                return;
            }
            if (id == "") {
                isnew = true;
                config = new TConfigSelector_1.TConfigSelector();
            }
            config.info = info;
            config.url = url;
            config.selector = selector;
            config.attribs = JSON.stringify(attribs);
            config.update_time = new Date();
            await config.save();
            SequelizeMgr_1.SequelizeMgr.instance.configSQL.initConfigClwaer();
            this.sendResult(res, { "error": 0, "data": isnew ? "【新】保存成功id=" + config.id : "【旧】修改成功" });
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
exports.Get_html_5_upload_info_handler = Get_html_5_upload_info_handler;
//# sourceMappingURL=Get_html_5_upload_info_handler.js.map