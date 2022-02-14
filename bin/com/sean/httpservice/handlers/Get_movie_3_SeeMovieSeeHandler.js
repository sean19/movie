"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_movie_3_SeeMovieSeeHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const ConfigMgr_1 = require("../../ConfigMgr");
const MovieClawer_1 = require("../util/movie/MovieClawer");
class Get_movie_3_SeeMovieSeeHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        var msg = JSON.parse(datastr);
        let title = msg.title || '';
        let link = msg.link || '';
        let platform = msg.platform || '';
        var movieVO = ConfigMgr_1.ConfigMgr.instance.getConfig("movie_" + platform);
        if (movieVO) {
            var sc = new MovieClawer_1.MovieClawer();
            var sr = await sc.getSeeMovieVO(link, movieVO);
            this.sendResult(res, { "error": 0, "data": { playContent: sr.playContent } });
        }
        else {
            this.sendResult(res, { "error": 1, "data": '' });
        }
        if (title != '') {
            // RecordSee.checkRecord(movieVO.name,title,this.getClientIP(req));
        }
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.Get_movie_3_SeeMovieSeeHandler = Get_movie_3_SeeMovieSeeHandler;
//# sourceMappingURL=Get_movie_3_SeeMovieSeeHandler.js.map