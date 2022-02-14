"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysEventInfo = void 0;
class SysEventInfo {
    constructor(evt, fc) {
        this.evt = evt;
        this.fc = fc;
    }
    callfc(param) {
        this.fc.apply(null, param);
    }
    dispose() {
        this.fc = null;
    }
}
exports.SysEventInfo = SysEventInfo;
//# sourceMappingURL=SysEventInfo.js.map