"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilGetFromASINCode = void 0;
const UtillHttpSuperagent_1 = require("../../../crawler/utillHttp/UtillHttpSuperagent");
const UtillQueryData_1 = require("../../../crawler/utillHttp/UtillQueryData");
class UtilGetFromASINCode {
    static async getFromASINCode(asincode) {
        var url = UtilGetFromASINCode.url + asincode;
        var content = await UtillHttpSuperagent_1.UtillHttpSuperagent.gatUrlData(url);
        var dataStr = [];
        var startIndexOfInformation = content.indexOf('Product information');
        var strInfomation = content.substring(startIndexOfInformation, startIndexOfInformation + 20000);
        var $ = await UtillQueryData_1.UtillQueryData.getQueryData(strInfomation);
        //todd********************************* not good enough coding\
        $('.item-model-number td').each(function (i, e) {
            if (i == 1) {
                dataStr[0] = $(e).text();
            }
        });
        $('#SalesRank td').each(function (i, e) {
            if (i == 1) {
                var reg = /\w+/;
                var rank = $(e).text();
                dataStr[1] = rank.substring(rank.indexOf('#'), rank.indexOf('('));
            }
        });
        $('.size-weight td').each(function (i, e) {
            if (i == 3) {
                dataStr[2] = $(e).text();
            }
        });
        return dataStr;
    }
}
exports.UtilGetFromASINCode = UtilGetFromASINCode;
UtilGetFromASINCode.url = "https://www.amazon.com/dp/";
//# sourceMappingURL=UtilGetFromASINCode.js.map