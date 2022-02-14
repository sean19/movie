"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const SequelizeMgr_1 = require("./SequelizeMgr");
const LogManager_1 = require("./log/LogManager");
const SysEventManager_1 = require("./sysEvents/SysEventManager");
const SysEnumEvent_1 = require("./sysEvents/SysEnumEvent");
const ConfigMgr_1 = require("./ConfigMgr");
const TestCrawler_1 = require("./crawler/TestCrawler");
class App {
    static init(config) {
        //配置文件初始化
        ConfigMgr_1.ConfigMgr.instance.config = config;
        //初始化日志文件
        LogManager_1.LogManager.instance.initLog();
        this.initSequelize();
        // new WebCrawler(ConfigMgr.instance.getConfig("test2"))
    }
    static initSequelize() {
        SysEventManager_1.SysEventManager.instance.addCallBack(SysEnumEvent_1.SysEnumEvent.sequelize_init_ok, this.initSequelizeok.bind(this));
        SequelizeMgr_1.SequelizeMgr.instance.init();
        SequelizeMgr_1.SequelizeMgr.instance.authenticate();
    }
    static async initSequelizeok() {
        LogManager_1.LogManager.instance.oninfo("数据库连接完成!");
        await SequelizeMgr_1.SequelizeMgr.instance.configSQL.init();
        await TestCrawler_1.TestCrawler.i.init();
        // SequelizeMgr.instance.SQ.addModels([TConfigBook]);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map