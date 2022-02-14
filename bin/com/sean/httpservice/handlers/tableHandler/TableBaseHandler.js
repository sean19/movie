"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBaseHandler = void 0;
const UtlHttp_1 = require("../../util/UtlHttp");
const HandlerHttp_1 = require("../HandlerHttp");
class TableBaseHandler extends HandlerHttp_1.HandlerHttp {
    constructor() {
        super(...arguments);
        this.tableName = "";
    }
    exec(req, res) {
        super.exec(req, res);
        var postdata = "";
        let self = this;
        req.on("data", function (data) {
            postdata += data;
        });
        req.on("end", function () {
            var datastr = decodeURIComponent(postdata);
            self.tableName = UtlHttp_1.UtlHttp.getInfo(datastr, "tableName");
            self.primaryKey = UtlHttp_1.UtlHttp.getInfo(datastr, "primaryKey");
            self.onGetData(res, datastr);
        });
    }
    onGetData(res, datastr) {
    }
}
exports.TableBaseHandler = TableBaseHandler;
//# sourceMappingURL=TableBaseHandler.js.map