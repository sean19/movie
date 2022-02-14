"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config_page_set_handler = void 0;
const HandlerNotNeedLogin_1 = require("../HandlerNotNeedLogin");
const TConfigPage_1 = require("../../../sqlTable/TConfigPage");
class Config_page_set_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.id || '';
            let des = msg.des || '';
            let platform = msg.platform || '';
            let model = msg.model || '';
            let json = msg.json || '';
            let code = msg.code || '';
            var pageconfig = await TConfigPage_1.TConfigPage.findByPk(id);
            if (platform == "1" || (pageconfig && pageconfig.platform == "1" && code != "sean")) {
                this.sendResult(res, { "error": 1, "data": "不能上传平台为1的配置信息！" });
                return;
            }
            if (!pageconfig) {
                pageconfig = new TConfigPage_1.TConfigPage();
                pageconfig.isNewRecord = true;
            }
            pageconfig.platform = platform;
            pageconfig.model = model;
            pageconfig.description = des;
            pageconfig.json = JSON.stringify(json);
            pageconfig.update_time = new Date();
            await pageconfig.save();
            this.sendResult(res, { "error": 0, "data": pageconfig });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
}
exports.Config_page_set_handler = Config_page_set_handler;
//# sourceMappingURL=Config_page_set_handler.js.map