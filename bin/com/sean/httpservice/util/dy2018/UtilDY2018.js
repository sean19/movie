"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilDY2018 = void 0;
const UtillHttpPuppeteer_1 = require("../../../crawler/utillHttp/UtillHttpPuppeteer");
const UtillQueryData_1 = require("../../../crawler/utillHttp/UtillQueryData");
const UtillDY2018PageInfo_1 = require("./UtillDY2018PageInfo");
class UtilDY2018 {
    static getFLName(flindex) {
        return UtilDY2018.name_fl[flindex];
    }
    // public static url:string="http://www.baidu.com";
    static async getDy2018Main() {
        // var content:string =await  UtillHttpSuperagent.gatUrlData(UtilDY2018.url);
        var content = "";
        var retyrn_num = 5;
        while (content == "" && --retyrn_num >= 0) {
            content = await UtillHttpPuppeteer_1.UtillHttpPuppeteer.gatUrlData(UtilDY2018.url);
            if (content == "") {
                console.log("cannot open web!");
            }
            else {
                var $ = UtillQueryData_1.UtillQueryData.getQueryData(content);
                var mvs = [];
                var ass = $('.co_content222 ul li a');
                for (var i = 0; i < ass.length; i++) {
                    var aa = ass[i];
                    var url = UtilDY2018.url + aa.attribs['href'];
                    var pginfo = new UtillDY2018PageInfo_1.UtillDY2018PageInfo();
                    var objs = await pginfo.getPageInfo(aa.attribs['title'], url);
                    mvs.push(objs);
                }
            }
        }
        return content;
    }
}
exports.UtilDY2018 = UtilDY2018;
UtilDY2018.name_fl = ["剧情片", "喜剧片", "动作片", "爱情片", "科幻片", "恐怖片", "动画片", "惊悚片", "战争片", "犯罪片"];
UtilDY2018.idx_fl = [0, 1, 2, 3, 4, 8, 5, 7, 14, 15];
UtilDY2018.url = "https://www.dy2018.com";
//# sourceMappingURL=UtilDY2018.js.map