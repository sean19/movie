"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSelectorMZP = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
class MovieSelectorMZP extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        var MovieVOArr = [];
        var $ = res["$"];
        var len = $('body  div.wrap  div.search  ul li').length;
        for (var i = 0; i < len; i++) {
            var sr = new MovieVO_1.MovieVO();
            var idx = i + 1;
            sr.title = $('body  div.wrap  div.search  ul  li:nth-child(' + idx + ')  a')[0].attribs['title'];
            sr.href = $('body  div.wrap  div.search  ul  li:nth-child(' + idx + ')  a')[0].attribs['href'];
            sr.imgurl = $('body  div.wrap  div.search  ul  li:nth-child(' + idx + ')  a  div.simg  div  img')[0].attribs['data-original'];
            MovieVOArr.push(sr);
        }
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var $ = res["$"];
        if (!$)
            return [];
        var numWay = $('#con_vod_1 > div:nth-child(3) > div.numList.clearfix > li').length;
        for (var i = 0; i < numWay; i++) {
            var sr = new MovieVO_1.MovieVO();
            var idx = i + 1;
            var node = $('#con_vod_1 > div:nth-child(3) > div.numList.clearfix > li:nth-child(' + idx + ') > a');
            sr.href = node[0].attribs['href'];
            sr.target = node[0].attribs['target'];
            sr.title = node[0].attribs['title'];
            sr.playway = "聚合";
            MovieVOArr.push(sr);
        }
        return MovieVOArr;
    }
    //**------------------------------------------
    //**------------------------------------------
    async getMovieSeeVO(link, res, movieConfigVO) {
        var m11kInfo = new MovieVO_1.MovieVO();
        var tt = "";
        try {
            var $ = res["$"];
            if (!$)
                return null;
            var jsdata = $('#players > script:nth-child(1)')[0].children[0].data;
            jsdata = jsdata.substring(13, jsdata.length - 2);
            var arrdata = JSON.parse(jsdata).Data[0].playurls;
            var idx = parseInt(link.substring(link.indexOf('-') + 1, link.indexOf('.'))) - 1;
            var arrline = arrdata[idx];
            tt = arrline[0];
            m11kInfo.href = movieConfigVO.play_path + arrline[1];
            m11kInfo.playway = arrline[2];
            m11kInfo.playContent = this.getPlayContent(m11kInfo.href);
        }
        catch (e) {
        }
        return m11kInfo;
    }
}
exports.MovieSelectorMZP = MovieSelectorMZP;
//# sourceMappingURL=MovieSelectorMZP.js.map