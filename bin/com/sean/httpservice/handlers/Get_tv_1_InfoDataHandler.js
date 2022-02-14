"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_tv_1_InfoDataHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const MovieClawer_1 = require("../util/movie/MovieClawer");
const ConfigMgr_1 = require("../../ConfigMgr");
class Get_tv_1_InfoDataHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        var msg = JSON.parse(datastr);
        let platform = msg.platform || '';
        var movieVO = ConfigMgr_1.ConfigMgr.instance.getConfig("movie_" + platform);
        if (movieVO) {
            var sc = new MovieClawer_1.MovieClawer();
            var sr = await sc.getInfoMovieVOS("", movieVO);
            this.sendResult(res, { "error": 0, "data": sr });
        }
        else {
            this.sendResult(res, { "error": 1, "data": '' });
        }
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.Get_tv_1_InfoDataHandler = Get_tv_1_InfoDataHandler;
//# sourceMappingURL=Get_tv_1_InfoDataHandler.js.map