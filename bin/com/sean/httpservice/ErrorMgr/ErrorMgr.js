"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrEnumType = exports.ErrorMgr = void 0;
const LogManager_1 = require("../../log/LogManager");
class ErrorMgr {
    static get instance() {
        if (ErrorMgr._instance == null) {
            ErrorMgr._instance = new ErrorMgr();
        }
        return ErrorMgr._instance;
    }
    onerr(e, type = ErrEnumType.err_sys) {
        LogManager_1.LogManager.instance.onerror(e);
        // console.log(e);
    }
}
exports.ErrorMgr = ErrorMgr;
var ErrEnumType;
(function (ErrEnumType) {
    ErrEnumType[ErrEnumType["err_sys"] = 1] = "err_sys";
    ErrEnumType[ErrEnumType["err_data"] = 2] = "err_data";
})(ErrEnumType = exports.ErrEnumType || (exports.ErrEnumType = {}));
//# sourceMappingURL=ErrorMgr.js.map