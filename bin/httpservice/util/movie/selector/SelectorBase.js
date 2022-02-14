"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorBase = void 0;
class SelectorBase {
    getMovieSearchVOArr(res, movieConfigVO) {
        return [];
    }
    getMovieInfoVOArr(res) {
        return [];
    }
    async getMovieSeeVO(link, res, movieConfigVO) {
        return null;
    }
    /**
     *
     * @param href
     * @param ty 1 - iframe 2-video
     */
    getPlayContent(href, ty = '1') {
        if (ty == "2") {
            return "<video controls autoplay ><source src='" + href + "' autoplay='autoplay'></video>";
        }
        else {
            return "<iframe id = 'frameSee'  frameborder='0' onload='loadFrame()' src='" + href + "?rel=0&amp;autoplay=1" + "' style='width:100%;height:100%' allowfullscreen=''true' ></iframe>";
        }
    }
    getImglink(link, movieConfigVO) {
        if (link.indexOf('/') == 0) {
            link = movieConfigVO.host + link;
        }
        return link;
    }
}
exports.SelectorBase = SelectorBase;
//# sourceMappingURL=SelectorBase.js.map