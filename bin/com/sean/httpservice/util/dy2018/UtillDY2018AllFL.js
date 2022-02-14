"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillDY2018AllFL = void 0;
const UtillDy2018FL_1 = require("./UtillDy2018FL");
const UtilDY2018_1 = require("./UtilDY2018");
class UtillDY2018AllFL {
    async getallFL() {
        for (var i = 0; i < UtilDY2018_1.UtilDY2018.idx_fl.length; i++) {
            let movietype = UtilDY2018_1.UtilDY2018.idx_fl[i];
            var fl = new UtillDy2018FL_1.UtillDy2018FL();
            await fl.getData(movietype);
        }
    }
}
exports.UtillDY2018AllFL = UtillDY2018AllFL;
//# sourceMappingURL=UtillDY2018AllFL.js.map