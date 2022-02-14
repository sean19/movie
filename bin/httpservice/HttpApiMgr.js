"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpApiMgr = void 0;
const UtilGetFromASINCode_1 = require("./util/amazon/UtilGetFromASINCode");
class HttpApiMgr {
    static get instance() {
        if (HttpApiMgr._instance == null) {
            HttpApiMgr._instance = new HttpApiMgr();
        }
        return HttpApiMgr._instance;
    }
    /**
     * get fata from asincode
     * @param {string} code
     * @returns {Promise<string[]>}
     */
    async getASINDateFromUrl(asincode) {
        var dataStr = await UtilGetFromASINCode_1.UtilGetFromASINCode.getFromASINCode(asincode);
        return dataStr;
    }
}
exports.HttpApiMgr = HttpApiMgr;
//# sourceMappingURL=HttpApiMgr.js.map