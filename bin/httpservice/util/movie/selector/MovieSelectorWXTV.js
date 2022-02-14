"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSelectorWXTV = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
class MovieSelectorWXTV extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        var MovieVOArr = [];
        if (res == null)
            return [];
        var $ = res["$"];
        if ($ == null)
            return [];
        var len = $('#data_list > li').length;
        for (var i = 0; i < len; i++) {
            var movieVO = new MovieVO_1.MovieVO();
            var idx = i + 1;
            movieVO.title = $('#data_list > li:nth-child(' + idx + ') > div > a > img')[0].attribs['alt'];
            movieVO.href = $('#data_list > li:nth-child(' + idx + ') > div > a')[0].attribs['href'];
            movieVO.imgurl = $('#data_list > li:nth-child(' + idx + ') > div > a > img')[0].attribs['src'];
            MovieVOArr.push(movieVO);
        }
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var $ = res["$"];
        try {
            var len = $('.lhmain').length;
            for (var i = 0; i < len; i++) {
                var playway = $('.lhmain span')[i].children[0].data;
                var lena = $('.lhmain li').length / len;
                for (var j = 0; j < lena; j++) {
                    var idx = j + 1;
                    var obj = $('.lhmain li:nth-child(' + idx + ')>a')[i];
                    var movieVO = new MovieVO_1.MovieVO();
                    MovieVOArr.push(movieVO);
                    movieVO.title = obj.attribs['title'];
                    movieVO.href = obj.attribs['href'];
                    movieVO.playway = playway;
                }
            }
        }
        catch (e) {
        }
        return MovieVOArr;
    }
    async getMovieSeeVO(link, res, movieConfigVO) {
        var playIndexArr = link.split('-'); //
        var wayidx = parseInt(playIndexArr[1]) - 1;
        var playidx = parseInt(playIndexArr[2]) - 1;
        var content = res["body"]; //.toString();
        var $ = res['$'];
        var data = $('#playbox script:nth-child(1)')[0].children[0].data;
        var urls = data.substring(data.lastIndexOf('(') + 2, data.lastIndexOf(')') - 1);
        var urlsunescape = unescape(urls);
        var allways = urlsunescape.split("$$");
        var plays = allways[wayidx].split("#");
        var playinfoarr = plays[playidx].split("$");
        var m11kInfo = new MovieVO_1.MovieVO();
        m11kInfo.title = playinfoarr[0];
        var href = playinfoarr[1];
        if (m11kInfo.title == "") {
            m11kInfo.title = playinfoarr[1];
            var href = playinfoarr[2];
        }
        if (href.indexOf('m3u8') == -1) {
            href = 'https://v.jump8.cn/play/tz/pc/?url=' + href;
        }
        m11kInfo.playContent = this.getPlayContent(href, '1');
        return m11kInfo;
    }
}
exports.MovieSelectorWXTV = MovieSelectorWXTV;
//# sourceMappingURL=MovieSelectorWXTV.js.map