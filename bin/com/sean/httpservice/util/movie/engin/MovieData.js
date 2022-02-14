"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieData = void 0;
const ConfigMgr_1 = require("../../../../ConfigMgr");
const MovieClawer_1 = require("../MovieClawer");
class MovieData {
    constructor(md) {
        this.movie_info = md;
    }
    dispose() {
    }
    async startLoad() {
        await this.loadInfo();
    }
    async loadInfo() {
        var cvo = ConfigMgr_1.ConfigMgr.instance.getConfig("movie_" + this.movie_info.platform);
        if (cvo) {
            var sc = new MovieClawer_1.MovieClawer();
            var arrinfo = await sc.getInfoMovieVOS(this.movie_info.href, cvo);
            var arrsee = [];
            var infolist = "";
            for (var i = 0; i < arrinfo.length; i++) {
                var mif = arrinfo[i];
                var seevo = await sc.getSeeMovieVO(mif.href, cvo);
                seevo.titleInfo = mif.title;
                arrsee.push(seevo);
                infolist += mif.href + ";";
            }
            arrsee.forEach(svo => {
                svo.platform = this.movie_info.platform;
                svo.info = this.movie_info.info;
                svo.imgurl = this.movie_info.imgurl;
                svo.title = this.movie_info.title;
                svo.urlList = infolist;
                svo.saveInfo();
            });
        }
    }
}
exports.MovieData = MovieData;
//# sourceMappingURL=MovieData.js.map