"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSelectorTVHAO5 = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
class MovieSelectorTVHAO5 extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        var MovieVOArr = [];
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var $ = res["$"];
        var len = $('.channel-link').length;
        for (var i = 0; i < len; i++) {
            var movieVO = new MovieVO_1.MovieVO();
            movieVO.href = $('.channel-link')[i].attribs['href'];
            movieVO.title = $('.channel-link')[i].children[0].data;
            movieVO.playway = "直播";
            MovieVOArr.push(movieVO);
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
            if ($('iframe').length > 0) {
                m11kInfo.href = $('iframe')[0].attribs['src'];
                m11kInfo.playContent = this.getPlayContent(m11kInfo.href, '1');
            }
            else if ($('video').length > 0) {
                m11kInfo.href = $('video')[0].attribs['src'];
                m11kInfo.playContent = this.getPlayContent(m11kInfo.href, '2');
            }
        }
        catch (e) {
        }
        return m11kInfo;
    }
}
exports.MovieSelectorTVHAO5 = MovieSelectorTVHAO5;
//# sourceMappingURL=MovieSelectorTVHAO5.js.map