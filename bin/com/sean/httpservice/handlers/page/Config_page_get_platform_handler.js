"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config_page_get_platform_handler = void 0;
const HandlerNotNeedLogin_1 = require("../HandlerNotNeedLogin");
const TConfigPage_1 = require("../../../sqlTable/TConfigPage");
class Config_page_get_platform_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let platform = msg.platform || '';
            var pageconfigs = await TConfigPage_1.TConfigPage.findAll({ where: { platform: platform } });
            if (platform == "" || pageconfigs == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
                return;
            }
            this.sendResult(res, { "error": 0, "data": pageconfigs });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
}
exports.Config_page_get_platform_handler = Config_page_get_platform_handler;
//# sourceMappingURL=Config_page_get_platform_handler.js.map