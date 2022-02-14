"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = void 0;
const ConfigMgr_1 = require("../ConfigMgr");
var path = require('path');
class LogManager {
    constructor() {
        /**
    
         * 第一种：
    
         * configure方法为配置log4js对象，内部有levels、appenders、categories三个属性
    
         * levels:
    
         *         配置日志的输出级别,共ALL<TRACE<DEBUG<INFO<WARN<ERROR<FATAL<MARK<OFF八个级别,default level is OFF
    
         *         只有大于等于日志配置级别的信息才能输出出来，可以通过category来有效的控制日志输出级别
    
         * appenders:
    
         *         配置文件的输出源，一般日志输出type共有console、file、dateFile三种
    
         *         console:普通的控制台输出
    
         *         file:输出到文件内，以文件名-文件大小-备份文件个数的形式rolling生成文件
    
         *         dateFile:输出到文件内，以pattern属性的时间格式，以时间的生成文件
    
         * replaceConsole:
    
         *         是否替换控制台输出，当代码出现console.log，表示以日志type=console的形式输出
    
         *
    
         */
        this.is_open = false;
    }
    static get instance() {
        if (null == LogManager._instance) {
            LogManager._instance = new LogManager();
        }
        return LogManager._instance;
    }
    initLog() {
        var config = ConfigMgr_1.ConfigMgr.instance.config;
        LogManager.instance.is_open = config["openlog"] == "1" ? true : false;
        console.log("is log open:" + LogManager.instance.is_open);
        if (this.is_open == false)
            return;
        // 基本使用
        this.log4js = require('log4js');
        this.log4js.configure({
            appenders: {
                out: { type: 'stdout' },
                ruleConsole: { type: 'console' },
                ruleFile: {
                    type: 'dateFile',
                    filename: '../logs/' + config.logname,
                    pattern: 'yyyy-MM-dd.log',
                    maxLogSize: 10 * 1000 * 1000,
                    numBackups: 3,
                    alwaysIncludePattern: true
                }
            },
            categories: {
                default: {
                    appenders: ['out', 'ruleFile'],
                    level: 'info'
                }
            }
        });
        this.logger = this.log4js.getLogger();
        LogManager.instance.oninfo("log服务器启动中" + Date.now().toLocaleString());
    }
    onTrace(msg) {
        if (this.is_open) {
            this.logger.trace(msg);
        }
        else {
            console.log(msg);
        }
    }
    ondebug(msg) {
        if (this.is_open) {
            this.logger.debug(msg);
        }
        else {
            console.log(msg);
        }
    }
    oninfo(msg) {
        if (this.is_open) {
            this.logger.info(msg);
        }
        else {
            // console.log(msg);
        }
    }
    onwarn(msg) {
        if (this.is_open) {
            this.logger.warn(msg);
        }
        else {
            console.log(msg);
        }
    }
    onerror(msg) {
        if (this.is_open) {
            this.logger.error(msg);
        }
        else {
            console.log(msg);
        }
    }
    fatal(msg) {
        if (this.is_open) {
            this.logger.fatal(msg);
        }
        else {
            console.log(msg);
        }
    }
}
exports.LogManager = LogManager;
//# sourceMappingURL=LogManager.js.map