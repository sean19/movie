
var path = require('path')

export class ConfigMgr {
    private static _instance: ConfigMgr;
    public config;
    public static get instance(): ConfigMgr {
        if (null == ConfigMgr._instance) {
            ConfigMgr._instance = new ConfigMgr();
        }
        return ConfigMgr._instance;
    }
    public getConfig(key: string): any {

        return this.config[key];
    }
    public getDbConfig(): any {
        var dbkey: string = ConfigMgr.instance.getConfig(ConfigKey.use_db);
        return ConfigMgr.instance.getConfig(dbkey);
    }
    public getRedisConfig(): any {
        var dbkey: string = ConfigMgr.instance.getConfig(ConfigKey.use_redis);
        return ConfigMgr.instance.getConfig(dbkey);
    }
    public getStatisticConfig(): any {
        var dbkey: string = ConfigMgr.instance.getConfig(ConfigKey.use_statistic);
        return ConfigMgr.instance.getConfig(dbkey);
    }
    public getRedisVersion(): any {
        var dbkey: string = ConfigMgr.instance.getConfig(ConfigKey.redisVersion);
        return ConfigMgr.instance.getConfig(dbkey);
    }
}
export class ConfigKey {
    public static mysql_net: string = "mysql_net";
    public static mysql_local: string = "mysql_local";
    public static use_db: string = "use_db";

    public static redis_local: string = "redis_local";
    public static redis_net: string = "redis_net";
    public static use_redis: string = "use_redis";
    public static use_statistic: string = "use_statistic";

    public static openlog: string = "openlog";
    public static servers: string = "servers";
    public static version: string = "version";
    public static portwww: string = "portwww";
    public static redisVersion: string = "redis_version";
    public static errPhoneOpen: string = "errPhoneOpen";

    public static errPhone: string = "errPhone";
    public static serverkey: string = "serverkey";
    public static minuteAnalysSysGold: string = "minuteAnalysSysGold";
    public static syncServer: string = "syncServer";
    public static ip: string = "ip";
}