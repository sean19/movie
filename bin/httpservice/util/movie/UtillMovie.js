"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillMovie = void 0;
class UtillMovie {
    static getTargetSearchURL(keyword, movieVO, type) {
        var targtUrl = movieVO.host;
        if (type == "1") { //搜索
            var urlencode = require('urlencode');
            var newkey = urlencode(keyword, movieVO.chartset);
            targtUrl = movieVO.host + movieVO.search_path.replace('<keyword>', newkey);
        }
        return targtUrl;
    }
    static getTargetInfoURL(link, configVO) {
        var targtUrl = configVO.host + link;
        return targtUrl;
    }
    static getTargetSeeURL(link, configVO) {
        var targtUrl = configVO.see_path + link;
        switch (configVO.id) {
            case 4:
                var lk = link.substring(0, link.lastIndexOf('/'));
                lk = lk.substring(lk.lastIndexOf('/') + 1, lk.length);
                targtUrl = configVO.see_js.replace('<idx>', lk);
                break;
            // case 5:
            //     var lk = link.substring(0,link.lastIndexOf('-')+1)+'1';
            //     targtUrl = configVO.see_js.replace('<idx>',lk);
            //     break;
            case 100:
                targtUrl = link;
                break;
        }
        return targtUrl;
    }
}
exports.UtillMovie = UtillMovie;
//# sourceMappingURL=UtillMovie.js.map