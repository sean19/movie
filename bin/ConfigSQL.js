"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSQL = void 0;
const TConfigBook_1 = require("./sqlTable/TConfigBook");
const TConfigClawer_1 = require("./sqlTable/TConfigClawer");
class ConfigSQL {
    constructor() {
        this.arr_config_book = [];
        this.arr_config_clawer = [];
        //================================================
    }
    async init() {
        // await this.initBookConfig();
        // await this.initConfigClwaer();
    }
    //===================================================
    //===================================================
    //===================================================
    //===================================================
    async initBookConfig() {
        this.arr_config_book = await TConfigBook_1.TConfigBook.findAll();
        console.log('bookconfig--------' + this.arr_config_book.length);
    }
    getBookConfigByPlatformID(platformid) {
        var bk;
        for (var i = 0; i < this.arr_config_book.length; i++) {
            var cf = this.arr_config_book[i];
            if (cf.platformid == platformid) {
                bk = cf;
            }
        }
        return bk;
    }
    //================================================
    //===================================================
    async initConfigClwaer() {
        this.arr_config_clawer = await TConfigClawer_1.TConfigClawer.findAll();
        console.log('claweronfig--------' + this.arr_config_clawer.length);
    }
    getConfigClwaerByPlatformID(id) {
        var conf;
        for (var i = 0; i < this.arr_config_clawer.length; i++) {
            var cf = this.arr_config_clawer[i];
            if (cf.id == id) {
                conf = cf;
            }
        }
        return conf;
    }
}
exports.ConfigSQL = ConfigSQL;
//# sourceMappingURL=ConfigSQL.js.map