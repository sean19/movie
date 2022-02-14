"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config_book_update_handler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const BookConfig_1 = require("../util/BookConfig");
const TConfigBook_1 = require("../../sqlTable/TConfigBook");
const SequelizeMgr_1 = require("../../SequelizeMgr");
class Config_book_update_handler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        try {
            var msg = JSON.parse(datastr);
            let id = this.getreqdata(msg, "id");
            var bookconfig = await TConfigBook_1.TConfigBook.findByPk(id);
            if (id != "" && bookconfig == null) {
                this.sendResult(res, { "error": 1, "data": "找不到id为" + id + "的数据" });
                return;
            }
            var isnew = false;
            if (id == "") {
                bookconfig = new TConfigBook_1.TConfigBook();
                isnew = true;
            }
            bookconfig.platformid = this.getreqdata(msg, "platformid");
            bookconfig.pname = this.getreqdata(msg, "pname");
            bookconfig.host = this.getreqdata(msg, "host");
            bookconfig.searchstr = this.getreqdata(msg, "searchstr");
            bookconfig.searchinfo = this.getreqdata(msg, "searchinfo");
            bookconfig.searchpage = this.getreqdata(msg, "searchpage");
            bookconfig.chapterpage = this.getreqdata(msg, "chapterpage");
            bookconfig.chapterselect = this.getreqdata(msg, "chapterselect");
            bookconfig.infotitle = this.getreqdata(msg, "infotitle");
            bookconfig.infooption1 = this.getreqdata(msg, "infooption1");
            bookconfig.infooption2 = this.getreqdata(msg, "infooption2");
            bookconfig.infotext = this.getreqdata(msg, "infotext");
            bookconfig.updatedAt = new Date();
            bookconfig.save();
            await SequelizeMgr_1.SequelizeMgr.instance.configSQL.initBookConfig();
            this.sendResult(res, { "error": 0, "data": isnew ? "保存成功" : "更新成功" });
        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }
    getreqdata(msg, info) {
        return msg[info] || "";
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
exports.Config_book_update_handler = Config_book_update_handler;
//# sourceMappingURL=Config_book_update_handler.js.map