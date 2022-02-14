"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerNotNeedLogin = void 0;
const HandlerHttp_1 = require("./HandlerHttp");
class HandlerNotNeedLogin extends HandlerHttp_1.HandlerHttp {
    exec(req, res) {
        super.exec(req, res);
        var postdata = "";
        let self = this;
        req.on("data", function (data) {
            postdata += data;
        });
        req.on("end", function () {
            try {
                var datastr = decodeURIComponent(postdata);
                self.onGetData(req, res, datastr);
            }
            catch (e) {
                self.onGetData(req, res, postdata);
            }
        });
    }
    onGetData(req, res, datastr) {
    }
    sendResult(res, result) {
        console.log("发送结果：" + result["error"]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }
}
exports.HandlerNotNeedLogin = HandlerNotNeedLogin;
//# sourceMappingURL=HandlerNotNeedLogin.js.map