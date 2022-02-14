"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config_page_get_handler = void 0;
const HandlerNotNeedLogin_1 = require("../HandlerNotNeedLogin");
const TConfigPage_1 = require("../../../sqlTable/TConfigPage");
class Config_page_get_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.id || '';
            var pageconfig = await TConfigPage_1.TConfigPage.findByPk(id);
            if (id == "" || pageconfig == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
                return;
            }
            this.sendResult(res, { "error": 0, "data": pageconfig });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
}
exports.Config_page_get_handler = Config_page_get_handler;
//# sourceMappingURL=Config_page_get_handler.js.map