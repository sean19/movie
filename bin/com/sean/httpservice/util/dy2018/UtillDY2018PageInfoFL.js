"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillDY2018PageInfoFL = void 0;
const UtilDY2018_1 = require("./UtilDY2018");
const UtillDY2018PageInfo_1 = require("./UtillDY2018PageInfo");
const TTFL_1 = require("../../../sqlTable/TTFL");
class UtillDY2018PageInfoFL extends UtillDY2018PageInfo_1.UtillDY2018PageInfo {
    constructor(mv_FL, pageIndex) {
        super();
        this.mv_FL = mv_FL;
        this.mv_pageIndex = pageIndex;
    }
    async getPageInfo(title, url, refresh = false) {
        var objects = [];
        var flinfo = await TTFL_1.TTFL.findAll({ where: { from_link: url } });
        if (flinfo.length > 0 && refresh == false) {
            console.log("已经查过数据了：" + url);
        }
        else {
            return super.getPageInfo(title, url);
        }
        return objects;
    }
    //更新数据库条目===================
    async updateDB(mvinfo, obj) {
        var title = obj['title'];
        var title_sub = obj['title_sub'];
        var tt = await TTFL_1.TTFL.findOne({ where: {
                title: title, title_sub: title_sub
            }
        });
        if (tt) {
            tt.ud_time = new Date();
            console.log("【3】更新数据：" + this.link);
        }
        else {
            tt = new TTFL_1.TTFL;
            tt.cr_time = tt.ud_time = new Date();
            console.log("【3】新建数据：" + this.link);
        }
        tt.from_link = this.link;
        tt.mv_FL = UtilDY2018_1.UtilDY2018.getFLName(Number(this.mv_FL));
        tt.mv_pageIndex = this.mv_pageIndex;
        tt.title = title;
        tt.title_sub = title_sub;
        tt.mv_name = mvinfo.mv_name;
        tt.mv_name_1 = mvinfo.mv_name_1;
        tt.mv_area = mvinfo.mv_area;
        tt.mv_imdb = mvinfo.mv_imdb;
        tt.mv_lan = mvinfo.mv_lan;
        tt.mv_type = mvinfo.mv_type;
        tt.href = obj['href'];
        await tt.save();
    }
}
exports.UtillDY2018PageInfoFL = UtillDY2018PageInfoFL;
//# sourceMappingURL=UtillDY2018PageInfoFL.js.map