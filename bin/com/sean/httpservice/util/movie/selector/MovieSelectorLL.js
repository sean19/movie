"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSelectorLL = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
class MovieSelectorLL extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        var MovieVOArr = [];
        var $ = res["$"];
        var len = $('#contents > li').length;
        for (var i = 0; i < len; i++) {
            var movieVO = new MovieVO_1.MovieVO();
            var idx = i + 1;
            movieVO.title = $('#contents > li:nth-child(' + idx + ') > a').children()[0].attribs['alt'];
            movieVO.href = $('#contents > li:nth-child(' + idx + ') > a')[0].attribs['href'];
            movieVO.imgurl = this.getImglink($('#contents > li:nth-child(' + idx + ') > a').children()[0].attribs['src'], movieConfigVO);
            MovieVOArr.push(movieVO);
        }
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var $ = res["$"];
        var len = $('#dlist0 > li').length;
        for (var i = 0; i < len; i++) {
            var movieVO = new MovieVO_1.MovieVO();
            var idx = i + 1;
            movieVO.href = $("#dlist0 > li:nth-child(" + idx + ") > a")[0].attribs['href'];
            movieVO.title = $("#dlist0 > li:nth-child(" + idx + ") > a")[0].children[0].data;
            movieVO.playway = "乐乐";
            MovieVOArr.push(movieVO);
        }
        return MovieVOArr;
    }
    async getMovieSeeVO(link, res, movieConfigVO) {
        var content = res["body"]; //.toString();
        var m11kInfo = new MovieVO_1.MovieVO();
        var playIndexArr = link.substring(link.lastIndexOf('/') + 1, link.lastIndexOf('.html')).split('_');
        var os = content.substring(11, content.length - 1);
        var jsobj = JSON.parse(os);
        var wayobj = jsobj[parseInt(playIndexArr[0])];
        var mvstrarr = wayobj.movie[parseInt(playIndexArr[1])];
        m11kInfo.title = mvstrarr[0];
        var src = decodeURIComponent(mvstrarr[1]);
        var ty = ((src.indexOf(".mp4") == -1) ? "1" : "2");
        m11kInfo.playContent = this.getPlayContent(src, ty);
        return m11kInfo;
    }
}
exports.MovieSelectorLL = MovieSelectorLL;
//# sourceMappingURL=MovieSelectorLL.js.map