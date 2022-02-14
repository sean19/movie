"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config_book_get_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const BookConfig_1 = require("../util/BookConfig");
const TConfigBook_1 = require("../../sqlTable/TConfigBook");
const SequelizeMgr_1 = require("../../SequelizeMgr");
class Config_book_get_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.keyword || '';
            var bookconfig = await TConfigBook_1.TConfigBook.findByPk(id);
            if (id == "" || bookconfig == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
                return;
            }
            this.sendResult(res, { "error": 0, "data": bookconfig });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
    getBooURI(platform, keyword, page) {
        var uri = "";
        var urlencode = require('urlencode');
        var chartset = "utf-8";
        var configbook = SequelizeMgr_1.SequelizeMgr.instance.configSQL.getBookConfigByPlatformID(platform);
        switch (platform) {
            case "1":
                uri = configbook.host + (keyword ? "search.php?q=" + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
                return uri;
                break;
            case "2":
                uri = BookConfig_1.BookConfig.conf_book2["host"] + (keyword ? "modules/article/search.php?q=" + urlencode(keyword, chartset) : "") + (page ? "&p=" + page : "");
                return uri;
                break;
        }
        return uri;
    }
}
exports.Config_book_get_handler = Config_book_get_handler;
//# sourceMappingURL=Config_book_get_handler.js.map