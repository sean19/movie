"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSelectorM11 = void 0;
const SelectorBase_1 = require("./SelectorBase");
const MovieVO_1 = require("../../VO/MovieVO");
class MovieSelectorM11 extends SelectorBase_1.SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        var MovieVOArr = [];
        var $ = res["$"];
        var aa = "body  div:nth-child(1)  div  div.line-middle.margin-top  div.xl12.xs12.xm8.margin-top  div.tagbox  div  div.xl4.xs4.xm3.tagbox_pic.float-left.margin-top  a  ";
        var img = "body  div:nth-child(1)  div  div.line-middle.margin-top  div.xl12.xs12.xm8.margin-top  div.tagbox  div  div.xl4.xs4.xm3.tagbox_pic.float-left.margin-top  a  img";
        var len = $(aa).length;
        for (var i = 0; i < len; i++) {
            var sr = new MovieVO_1.MovieVO();
            var pp = $(aa)[i];
            sr.title = pp["attribs"]["title"];
            sr.href = pp["attribs"]["href"];
            sr.imgurl = $(img)[i]["attribs"]["src"];
            MovieVOArr.push(sr);
        }
        return MovieVOArr;
    }
    getMovieInfoVOArr(res) {
        var MovieVOArr = [];
        var ps = "body  div:nth-child(1)  div  div  div.xl12.xs12.xm8.float-left  div.txtcon  div  div.margin-big-top.body_media  div  li";
        var $ = res["$"];
        var len = $(ps).length;
        for (var i = 0; i < len; i++) {
            var sr = new MovieVO_1.MovieVO();
            sr.title = $(ps)[i].children[0]["attribs"].title;
            sr.href = $(ps)[i].children[0]["attribs"]['href'];
            sr.playway = "m11";
            MovieVOArr.push(sr);
        }
        return MovieVOArr;
    }
    async getMovieSeeVO(link, res, movieConfigVO) {
        var m11kInfo = new MovieVO_1.MovieVO();
        var $ = res["$"];
        var dd = $('script')[8].children[0].data;
        var idx1 = dd.indexOf("src=") + 6;
        var idx2 = dd.indexOf(".m3u8") + 5;
        var src = dd.substring(idx1, idx2);
        var sr = new MovieVO_1.MovieVO();
        if (src && src != "") {
            m11kInfo.href = movieConfigVO.play_path + src;
            m11kInfo.playContent = this.getPlayContent(m11kInfo.href);
        }
        return m11kInfo;
    }
}
exports.MovieSelectorM11 = MovieSelectorM11;
//# sourceMappingURL=MovieSelectorM11.js.map