"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie_tuijian_get = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const TMovieTJ_1 = require("../../sqlTable/TMovieTJ");
class Movie_tuijian_get extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        var msg = JSON.parse(datastr);
        let tjm = msg.tjm || '';
        var data;
        if (tjm) {
            data = await TMovieTJ_1.TMovieTJ.findOne({ where: { tjm: tjm } });
        }
        else {
            var tjlist = await TMovieTJ_1.TMovieTJ.findAll();
            data = tjlist[tjlist.length - 1];
        }
        if (data) {
            this.sendResult(res, { "error": 0, "data": data });
        }
        else {
            this.sendResult(res, { "error": 1, "platform": "", "data": '' });
        }
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.Movie_tuijian_get = Movie_tuijian_get;
//# sourceMappingURL=Movie_tuijian_get.js.map