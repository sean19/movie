"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MJTTPlayInfo = exports.MJTTWayInfo = exports.MovieSelectorMJTT = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
const DemocCrawler_1 = require("../../../../crawler/DemocCrawler");
class MovieSelectorMJTT extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO, selector = null) {
        var MovieVOArr = [];
        var $ = res["$"];
        if (!$)
            return [];
        var len = $('.book-li').length;
        for (var i = 0; i < len; i++) {
            var sr = new MovieVO_1.MovieVO();
            sr.title = $(".list_1 .book-li .listimg img")[i].attribs['alt'];
            sr.href = $(".list_1 .book-li a")[i].attribs['href'];
            sr.imgurl = this.getImglink($(".list_1 .book-li .listimg img")[i].attribs['src'], movieConfigVO);
            MovieVOArr.push(sr);
        }
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var $ = res["$"];
        if (!$)
            return [];
        var numWay = $('.test').length;
        for (var i = 0; i < numWay; i++) {
            var wayid = i + 1;
            var playway = $('div.test:nth-child(' + wayid + ') .arconix-toggle-title span:nth-child(1)').text();
            if (playway == "云播") {
                var info = $('div.test:nth-child(' + wayid + ') .arconix-toggle-title span:nth-child(2)').text();
                var numvo = $('div.test:nth-child(' + wayid + ') div.arconix-toggle-content.fn-clear a').length;
                for (var j = 0; j < numvo; j++) {
                    var sr = new MovieVO_1.MovieVO();
                    sr.href = $('div.test:nth-child(' + wayid + ') div.arconix-toggle-content.fn-clear a')[j].attribs['href'];
                    sr.rel = $('div.test:nth-child(' + wayid + ') div.arconix-toggle-content.fn-clear a')[j].attribs['rel'];
                    sr.target = $('div.test:nth-child(' + wayid + ') div.arconix-toggle-content.fn-clear a')[j].attribs['target'];
                    var t = $('div.test:nth-child(' + wayid + ') div.arconix-toggle-content.fn-clear a')[j].attribs['title'];
                    if (t) {
                        sr.title = t ? t : "";
                        sr.playway = playway;
                        sr.info = info;
                        MovieVOArr.push(sr);
                    }
                }
            }
        }
        return MovieVOArr;
    }
    //**------------------------------------------
    //**------------------------------------------
    async getMovieSeeVO(link, res, movieConfigVO) {
        var m11kInfo = new MovieVO_1.MovieVO();
        var $ = res["$"];
        if (!$)
            return null;
        try {
            var bofangurl = $("#bofang script")[0].attribs['src'];
            var ways = await this.getWayinfos(bofangurl, movieConfigVO);
            var ids = link.substring(link.lastIndexOf('/'), link.indexOf('.'));
            var idinfo = ids.split('-');
            var mjw = ways[parseInt(idinfo[1])];
            var playinfo = mjw.pls[parseInt(idinfo[2])];
            var playlink = playinfo.href;
            var from = playinfo.line;
            playlink = this.unCodeUrl(playlink, from);
            m11kInfo.playway = from;
            m11kInfo.href = playlink;
            m11kInfo.title = playinfo.tt;
            m11kInfo.playContent = this.getPlayContent(m11kInfo.href);
        }
        catch (e) {
        }
        return m11kInfo;
    }
    async getWayinfos(link, movieConfigVO) {
        var targetUrl = movieConfigVO.host + link;
        var res = await new DemocCrawler_1.DemocCrawler().crawFromUrl(targetUrl);
        // UtillHttpSuperagent.gatUrlData(targetUrl,5,'gbk');
        var content = res['body'];
        content = content.substring(content.indexOf('['), content.lastIndexOf(']'));
        content = content.replace(/"/g, "");
        var arrway = this.getPlayInfo(content);
        return arrway;
    }
    getPlayInfo(str) {
        var arr = str.split('[');
        var nar = this.getArrWithnoEMP(arr);
        var arrWay = [];
        for (var i = 0; i < nar.length; i++) {
            var way;
            var info = nar[i];
            if (info.indexOf(']') == -1) {
                if (way) {
                    arrWay.push(way);
                }
                way = new MJTTWayInfo();
                way.addWay(info);
            }
            else {
                if (way) {
                    way.addPls(info);
                    if (i == nar.length - 1) {
                        arrWay.push(way);
                    }
                }
            }
        }
        return arrWay;
    }
    getArrWithnoEMP(arr) {
        var nar = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != "") {
                nar.push(arr[i]);
            }
        }
        return nar;
    }
    static getUncode(str) {
        return eval("'" + str + "'"); //unescape(str.replace(/\u/g, "%u"));
    }
    unCodeUrl(url, from) {
        var s, vurl;
        if (from == "\u0062\u0064\u0068\u0064" || from == "\u0071\u0076\u006f\u0064") {
            s = url.split("|");
            if (s[0].toLowerCase().indexOf("\u0065\u0064\u0032\u006b\u003a\u002f\u002f") == 0) {
                vurl = s[0] + "|" + s[1] + "|" + s[2] + "|" + s[3] + "|" + s[4].substring(0, s[4].length - 5) + s[4].substring(s[4].length - 4) + "|";
            }
            else {
                vurl = s[0] + "|" + s[1].substring(0, s[1].length - 5) + s[1].substring(s[1].length - 4) + "|" + s[2] + "|";
            }
        }
        else if (from == "\u0067\u0076\u006f\u0064") {
            s = url.replace("\u0067\u0076\u006f\u0064\u003a\u002f\u002f", "").split("/");
            vurl = "\u0067\u0076\u006f\u0064\u003a\u002f\u002f" + s[0] + "/" + s[1].substring(0, s[1].length - 5) + s[1].substring(s[1].length - 4) + "/" + s[2] + "/" + s[3];
        }
        else {
            vurl = url.substring(0, url.length - 5) + url.substring(url.length - 4);
        }
        return vurl;
    }
}
exports.MovieSelectorMJTT = MovieSelectorMJTT;
class MJTTWayInfo {
    constructor() {
        this.pls = [];
    }
    addWay(info) {
        info = info.replace(',', "");
        this.way = MovieSelectorMJTT.getUncode(info);
    }
    addPls(info) {
        this.pls.push(new MJTTPlayInfo(info));
    }
}
exports.MJTTWayInfo = MJTTWayInfo;
class MJTTPlayInfo {
    constructor(info) {
        info = info.replace(']', "");
        var arr = info.split(',');
        this.tt = MovieSelectorMJTT.getUncode(arr[0]);
        this.href = arr[1];
        this.line = arr[2];
    }
}
exports.MJTTPlayInfo = MJTTPlayInfo;
//# sourceMappingURL=MovieSelectorMJTT.js.map