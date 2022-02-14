import { SequelizeMgr } from "./SequelizeMgr";
import {LogManager} from "./log/LogManager";
import {SysEventManager} from "./sysEvents/SysEventManager";
import {SysEnumEvent} from "./sysEvents/SysEnumEvent";
import {ConfigMgr} from "./ConfigMgr";
import {UtillDY2018AllFL} from "./httpservice/util/dy2018/UtillDY2018AllFL";
import {TestCrawler} from "./crawler/TestCrawler";
import sequelize = require("sequelize");
import { TConfigBook } from "./sqlTable/TConfigBook";

export class App {
    public static init(config: any) {
        //配置文件初始化
        ConfigMgr.instance.config = config;
        //初始化日志文件
        LogManager.instance.initLog();
        this.initSequelize();
        // new WebCrawler(ConfigMgr.instance.getConfig("test2"))

    }
    protected static initSequelize(): void {
        SysEventManager.instance.addCallBack(SysEnumEvent.sequelize_init_ok, this.initSequelizeok.bind(this));
        SequelizeMgr.instance.init();
        SequelizeMgr.instance.authenticate();
    }
    protected static async  initSequelizeok() {
        LogManager.instance.oninfo("数据库连接完成!");
        await SequelizeMgr.instance.configSQL.init();
        await TestCrawler.i.init();

        // SequelizeMgr.instance.SQ.addModels([TConfigBook]);
    }
}
