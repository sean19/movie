"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerHttp = void 0;
const ErrorMgr_1 = require("../ErrorMgr/ErrorMgr");
const SysModifyLog_1 = require("../../sqlTable/SysModifyLog");
class HandlerHttp {
    constructor(path, type = "GET") {
        this.path = path;
        this.type = type;
    }
    handl(req, res) {
        try {
            var re = req;
            this.deel(req, res);
            if (re.session.admin) {
                // this.setModifyLog(re.session.admin.id,re.session.admin.userName, this.path,"action",0);
            }
        }
        catch (e) {
            ErrorMgr_1.ErrorMgr.instance.onerr(e);
        }
    }
    deel(req, res) {
        this.exec(req, res);
    }
    exec(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    //create a modify log in sql
    setModifyLog(userId, userName, tableName, action, itemId) {
        var uid = userId + "";
        var log = new SysModifyLog_1.SysModifyLog();
        log.userId = userId + "";
        log.tableName = tableName;
        log.action = action;
        log.itemId = itemId;
        log.save();
    }
    /**
     * @getClientIP
     * @desc 获取用户 ip 地址
     * @param {Object} req - 请求
     */
    getClientIP(req) {
        return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
            req.connection.remoteAddress || // 判断 connection 的远程 IP
            req.socket.remoteAddress || // 判断后端的 socket 的 IP
            req.connection.socket.remoteAddress;
    }
    ;
}
exports.HandlerHttp = HandlerHttp;
//# sourceMappingURL=HandlerHttp.js.map