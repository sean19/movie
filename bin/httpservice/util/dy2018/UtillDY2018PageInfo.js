"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieInfo = exports.UtillDY2018PageInfo = void 0;
const UtillHttpPuppeteer_1 = require("../../../crawler/utillHttp/UtillHttpPuppeteer");
const UtillQueryData_1 = require("../../../crawler/utillHttp/UtillQueryData");
const TTMain_1 = require("../../../sqlTable/TTMain");
class UtillDY2018PageInfo {
    constructor() {
        this.link = "";
    }
    //获取详情页面内容===================
    async getPageInfo(title, url) {
        this.link = url;
        var objs = [];
        // console.log(title,"********");
        // var content:string =await  UtillHttpSuperagent.gatUrlData(url);
        var retry_num = 50;
        while (objs.length == 0 && --retry_num > 0) {
            var content = await UtillHttpPuppeteer_1.UtillHttpPuppeteer.gatUrlData(url);
            if (content != "") {
                var $ = UtillQueryData_1.UtillQueryData.getQueryData(content);
                var textinfo = $("#Zoom").text().split("◎");
                var mvinfo = new MovieInfo(textinfo);
                var lks = $("table tbody tr td a ");
                var movieInfos = this.getMovieInfo(mvinfo, title, lks);
                objs = objs.concat(movieInfos);
            }
            else {
            }
        }
        if (objs.length == 0) {
            console.log(url, 'get no data');
        }
        return objs;
    }
    //获取详连接列表===================
    getMovieInfo(mvinfo, title, lks) {
        var objs = [];
        for (var i = 0; i < lks.length; i++) {
            var lk = lks[i];
            var href = lk.attribs['href'];
            if (href.indexOf(".html") == -1 && href != "#") {
                var obj = { title: title };
                obj['title'] = title;
                obj['title_sub'] = lk.children[0].data;
                obj['href'] = href;
                this.updateDB(mvinfo, obj);
                objs.push(mvinfo);
            }
        }
        return objs;
    }
    //更新数据库条目===================
    async updateDB(mvinfo, obj) {
        var title = obj['title'];
        var title_sub = obj['title_sub'];
        var tt = await TTMain_1.TTMain.findOne({ where: {
                title: title, title_sub: title_sub
            }
        });
        if (tt) {
            tt.update_time = new Date();
        }
        else {
            tt = new TTMain_1.TTMain;
            tt.create_time = tt.update_time = new Date();
        }
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
exports.UtillDY2018PageInfo = UtillDY2018PageInfo;
class MovieInfo {
    constructor(strarr) {
        this.mv_name = "";
        this.mv_name_1 = "";
        this.mv_year = "";
        this.mv_area = "";
        this.mv_type = "";
        this.mv_lan = "";
        this.mv_imdb = "";
        this.mv_name = this.getinfo(strarr[2]);
        this.mv_name_1 = this.getinfo(strarr[1]);
        this.mv_year = this.getinfo(strarr[3]);
        this.mv_area = this.getinfo(strarr[4]);
        this.mv_type = this.getinfo(strarr[5]);
        this.mv_lan = this.getinfo(strarr[6]);
        this.mv_imdb = this.getinfo(strarr[9]);
    }
    getinfo(str) {
        if (str) {
            return str.substring(str.lastIndexOf("　") + 1, str.length);
        }
        return "";
    }
}
exports.MovieInfo = MovieInfo;
//# sourceMappingURL=UtillDY2018PageInfo.js.map