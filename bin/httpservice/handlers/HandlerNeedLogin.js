"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerNeedLogin = void 0;
const HttpConfig_1 = require("../HttpConfig");
const HandlerHttp_1 = require("./HandlerHttp");
class HandlerNeedLogin extends HandlerHttp_1.HandlerHttp {
    deel(req, res) {
        if (this.isLogin(req, res)) {
            this.exec(req, res);
        }
    }
    isLogin(req, res) {
        if (req.session.admin == null) {
            res.json({ error: HttpConfig_1.HttpConfig.NotLogin });
            return false;
        }
        if (Date.now() - req.session.admin.time >= HttpConfig_1.HttpConfig.SesionTime) {
            res.json({ error: HttpConfig_1.HttpConfig.NotLogin });
            return false;
        }
        return true;
    }
    exec(req, res) {
        this.req = req;
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}
exports.HandlerNeedLogin = HandlerNeedLogin;
//# sourceMappingURL=HandlerNeedLogin.js.map