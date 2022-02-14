import { TConfigBook } from "./sqlTable/TConfigBook";
import { TConfigClawer } from "./sqlTable/TConfigClawer";

export class ConfigSQL {
    protected arr_config_book: TConfigBook[] = [];
    protected arr_config_clawer: TConfigClawer[] = [];
    public async init() {
        await this.initBookConfig();
        await this.initConfigClwaer();
    }
    //===================================================
    //===================================================
    //===================================================
    //===================================================
    public async initBookConfig() {
        this.arr_config_book = await TConfigBook.findAll();
        console.log('bookconfig--------' + this.arr_config_book.length);
    }
    public getBookConfigByPlatformID(platformid: string): TConfigBook {
        var bk: TConfigBook;
        for (var i: number = 0; i < this.arr_config_book.length; i++) {
            var cf: TConfigBook = this.arr_config_book[i];
            if (cf.platformid == platformid) {
                bk = cf;
            }
        }
        return bk;
    }
    //================================================
    //===================================================
    public async initConfigClwaer() {
        this.arr_config_clawer = await TConfigClawer.findAll();
        console.log('claweronfig--------' + this.arr_config_clawer.length);
    }
    public getConfigClwaerByPlatformID(id: number): TConfigClawer {
        var conf: TConfigClawer;
        for (var i: number = 0; i < this.arr_config_clawer.length; i++) {
            var cf: TConfigClawer = this.arr_config_clawer[i];
            console.log(cf.id);
            if (cf.id == id) {
                conf = cf;
            }
        }
        return conf;
    }
    //================================================
}
