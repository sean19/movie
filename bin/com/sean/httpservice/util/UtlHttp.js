"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtlHttp = void 0;
class UtlHttp {
    static getInfo(info, key) {
        var infoarr = info.split('&');
        for (var i = 0; i < infoarr.length; i++) {
            var param = infoarr[i].split("=");
            var idx = infoarr[i].indexOf('=');
            if (param[0] == key) {
                return infoarr[i].substr(idx + 1, infoarr[i].length);
            }
        }
        return "";
    }
    static getNumber(info, key, df = 0) {
        var infoarr = info.split('&');
        for (var i = 0; i < infoarr.length; i++) {
            var param = infoarr[i].split("=");
            if (param[0] == key) {
                if (param[1] == "") {
                    return df;
                }
                else {
                    return Number.parseFloat(param[1]);
                }
            }
        }
        return df;
    }
    static getDate(info, key) {
        var date = new Date();
        var infoarr = info.split('&');
        for (var i = 0; i < infoarr.length; i++) {
            var param = infoarr[i].split("=");
            if (param[0] == key) {
                if (param[1] != "") {
                    return new Date(param[1]);
                }
            }
        }
        return date;
    }
    static getObjectFromUrlString(urlString) {
        var obj = {};
        var infoarr = urlString.split('&');
        for (var i = 0; i < infoarr.length; i++) {
            var param = infoarr[i].split("=");
            var key = param[0];
            var value = param[1];
            if (key != "xml" && key != "tableName" && value != "") {
                eval("obj." + key + "='" + value + "'");
            }
        }
        return obj;
    }
}
exports.UtlHttp = UtlHttp;
//# sourceMappingURL=UtlHttp.js.map