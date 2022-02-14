"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysEventManager = void 0;
const SysEventInfo_1 = require("./SysEventInfo");
class SysEventManager {
    constructor() {
        this.arr_info = [];
    }
    static get instance() {
        if (null == SysEventManager._instance) {
            SysEventManager._instance = new SysEventManager();
        }
        return SysEventManager._instance;
    }
    addCallBack(evt, fc) {
        if (this.getEvent(evt, fc) != null)
            return;
        this.arr_info.push(new SysEventInfo_1.SysEventInfo(evt, fc));
    }
    removeCallBack(evt, fc) {
        for (var i = 0; i < this.arr_info.length; i++) {
            var info = this.arr_info[i];
            if (info.evt == evt && info.fc == fc) {
                info.dispose();
                this.arr_info.splice(i, 1);
                return;
            }
        }
    }
    callEvent(evt, param) {
        for (var i = 0; i < this.arr_info.length; i++) {
            var info = this.arr_info[i];
            if (info.evt == evt) {
                info.callfc(param);
            }
        }
    }
    getEvent(evt, fc) {
        for (var i = 0; i < this.arr_info.length; i++) {
            var info = this.arr_info[i];
            if (info.evt == evt && info.fc == fc) {
                return info;
            }
        }
        return null;
    }
}
exports.SysEventManager = SysEventManager;
//# sourceMappingURL=SysEventManager.js.map