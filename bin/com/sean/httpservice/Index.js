"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const HandlerNeedLogin_1 = require("./handlers/HandlerNeedLogin");
class Index extends HandlerNeedLogin_1.HandlerNeedLogin {
    exec(req, res) {
        super.exec(req, res);
        res.set("q", "1");
        res.send("page");
    }
}
exports.Index = Index;
//# sourceMappingURL=Index.js.map