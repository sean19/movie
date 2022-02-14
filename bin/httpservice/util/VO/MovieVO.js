"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieVO = void 0;
const TMovieSee_1 = require("../../../sqlTable/TMovieSee");
class MovieVO {
    async saveInfo() {
        console.log("=======+6ii" + (MovieVO.ii++));
        var tms = await TMovieSee_1.TMovieSee.findOne({ where: { href: this.href } });
        if (tms == null) {
            tms = new TMovieSee_1.TMovieSee();
        }
        tms.href = this.href;
        tms.title = this.title;
        tms.titleInfo = this.titleInfo;
        tms.platform = this.platform;
        tms.rel = this.rel;
        tms.target = this.target;
        tms.info = this.info;
        tms.urlList = this.urlList;
        tms.imgurl = this.imgurl;
        tms.playContent = this.playContent;
        await tms.save().catch(error => {
            // console.log("*************"+error.toString())
        });
    }
}
exports.MovieVO = MovieVO;
MovieVO.ii = 0;
//# sourceMappingURL=MovieVO.js.map