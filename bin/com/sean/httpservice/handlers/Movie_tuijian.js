"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie_tuijian = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TMovieTJ_1 = require("../../sqlTable/TMovieTJ");
class Movie_tuijian extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        var msg = JSON.parse(datastr);
        let movieOrgurl = msg.movieOrgurl || '';
        let movieurl = msg.movieurl || '';
        let platform = msg.platform || '';
        let title = msg.title || '';
        let tjm = msg.tjm || '';
        if (!tjm || tjm == "") {
            tjm = Math.floor(Math.random() * 10000) + "";
        }
        var tm = new TMovieTJ_1.TMovieTJ();
        tm.title = title;
        tm.platform = platform;
        tm.movieurl = movieurl;
        tm.movieOrgurl = movieOrgurl;
        tm.tjm = tjm;
        await tm.save();
        var data = {};
        if (data) {
            this.sendResult(res, { "error": 0, "data": data });
        }
        else {
            this.sendResult(res, { "error": 1, "platform": platform, "data": '' });
        }
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.Movie_tuijian = Movie_tuijian;
//# sourceMappingURL=Movie_tuijian.js.map