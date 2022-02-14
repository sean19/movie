"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSelectorHJ = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
class MovieSelectorHJ extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        var MovieVOArr = [];
        var $ = res["$"];
        var len = $('#left .list').length;
        for (var i = 0; i < len; i++) {
            var movieVO = new MovieVO_1.MovieVO();
            var idx = i + 1;
            movieVO.title = $('#left .list .title a')[i].attribs['title'];
            movieVO.href = $('#left .list .title a')[i].attribs['href'];
            movieVO.imgurl = $('#left img')[i].attribs['src'];
            MovieVOArr.push(movieVO);
        }
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var $ = res["$"];
        try {
            var len = $('#play_url').length;
            for (var i = 0; i < len; i++) {
                var lena = $('.play-list a').length / len;
                for (var j = 0; j < lena; j++) {
                    var movieVO = new MovieVO_1.MovieVO();
                    MovieVOArr.push(movieVO);
                    var idx = j + 1;
                    movieVO.title = $('#play_url > ul > li:nth-child(' + idx + ') > a')[i].children[0].data;
                    var href = $('#play_url > ul > li:nth-child(' + idx + ') > a')[i].attribs['href'];
                    href = href.substring(0, href.lastIndexOf('-') + 1) + '1.js?5dbd79b563302-' + href.substring(href.lastIndexOf('-') + 1, href.indexOf('.html'));
                    movieVO.href = href;
                    movieVO.playway = $('#play_url > h2 > span:nth-child(1)')[i].children[0].data;
                }
            }
        }
        catch (e) {
        }
        return MovieVOArr;
    }
    async getMovieSeeVO(link, res, movieConfigVO) {
        var content = res["body"]; //.toString();
        var m11kInfo = new MovieVO_1.MovieVO();
        var playIndexArr = link.split('-'); //.substring(link.lastIndexOf('/')+1,link.lastIndexOf('.html')).split('_');
        var os = content.substring(13, content.length - 2);
        var jsobj = JSON.parse(os);
        var wayidx = parseInt(playIndexArr[2]);
        var playidx = parseInt(playIndexArr[4]) - 1;
        var wayobj = jsobj.Data[wayidx];
        var mvstrarr = wayobj.playurls[playidx];
        m11kInfo.title = mvstrarr[0];
        m11kInfo.playContent = this.getPlayContent('https://www.juji.tv/Runtime/Player/d.html?v=' + (mvstrarr[1]), '1');
        return m11kInfo;
    }
}
exports.MovieSelectorHJ = MovieSelectorHJ;
//# sourceMappingURL=MovieSelectorHJ.js.map