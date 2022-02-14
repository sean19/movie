"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigKey = exports.ConfigMgr = void 0;
var path = require('path');
class ConfigMgr {
    static get instance() {
        if (null == ConfigMgr._instance) {
            ConfigMgr._instance = new ConfigMgr();
        }
        return ConfigMgr._instance;
    }
    getConfig(key) {
        return this.config[key];
    }
    getDbConfig() {
        var dbkey = ConfigMgr.instance.getConfig(ConfigKey.use_db);
        return ConfigMgr.instance.getConfig(dbkey);
    }
    getRedisConfig() {
        var dbkey = ConfigMgr.instance.getConfig(ConfigKey.use_redis);
        return ConfigMgr.instance.getConfig(dbkey);
    }
    getStatisticConfig() {
        var dbkey = ConfigMgr.instance.getConfig(ConfigKey.use_statistic);
        return ConfigMgr.instance.getConfig(dbkey);
    }
    getRedisVersion() {
        var dbkey = ConfigMgr.instance.getConfig(ConfigKey.redisVersion);
        return ConfigMgr.instance.getConfig(dbkey);
    }
}
exports.ConfigMgr = ConfigMgr;
class ConfigKey {
}
exports.ConfigKey = ConfigKey;
ConfigKey.mysql_net = "mysql_net";
ConfigKey.mysql_local = "mysql_local";
ConfigKey.use_db = "use_db";
ConfigKey.redis_local = "redis_local";
ConfigKey.redis_net = "redis_net";
ConfigKey.use_redis = "use_redis";
ConfigKey.use_statistic = "use_statistic";
ConfigKey.openlog = "openlog";
ConfigKey.servers = "servers";
ConfigKey.version = "version";
ConfigKey.portwww = "portwww";
ConfigKey.redisVersion = "redis_version";
ConfigKey.errPhoneOpen = "errPhoneOpen";
ConfigKey.errPhone = "errPhone";
ConfigKey.serverkey = "serverkey";
ConfigKey.minuteAnalysSysGold = "minuteAnalysSysGold";
ConfigKey.syncServer = "syncServer";
ConfigKey.ip = "ip";
//# sourceMappingURL=ConfigMgr.js.map