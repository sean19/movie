"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeMgr = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const ConfigMgr_1 = require("./ConfigMgr");
const ConfigSQL_1 = require("./ConfigSQL");
const SysEnumEvent_1 = require("./sysEvents/SysEnumEvent");
const SysEventManager_1 = require("./sysEvents/SysEventManager");
class SequelizeMgr {
    constructor() {
        this._host = "";
    }
    get SQ() {
        return this._sequelize;
    }
    init() {
        this.configSQL = new ConfigSQL_1.ConfigSQL();
        var configmysql = ConfigMgr_1.ConfigMgr.instance.getDbConfig(); // .getConfig(ConfigKey.mysql);
        configmysql.modelPaths = [__dirname + "/sqlTable"];
        this._host = configmysql.host;
        // const Op = Sequelize.OP;
        // const operatorsAliases = {
        //     $eq: Op.eq,
        //     $ne: Op.ne,
        //     $gte: Op.gte,
        //     $gt: Op.gt,
        //     $lte: Op.lte,
        //     $lt: Op.lt,
        //     $not: Op.not,
        //     $in: Op.in,
        //     $notIn: Op.notIn,
        //     $is: Op.is,
        //     $like: Op.like,
        //     $notLike: Op.notLike,
        //     $iLike: Op.iLike,
        //     $notILike: Op.notILike,
        //     $regexp: Op.regexp,
        //     $notRegexp: Op.notRegexp,
        //     $iRegexp: Op.iRegexp,
        //     $notIRegexp: Op.notIRegexp,
        //     $between: Op.between,
        //     $notBetween: Op.notBetween,
        //     $overlap: Op.overlap,
        //     $contains: Op.contains,
        //     $contained: Op.contained,
        //     $adjacent: Op.adjacent,
        //     $strictLeft: Op.strictLeft,
        //     $strictRight: Op.strictRight,
        //     $noExtendRight: Op.noExtendRight,
        //     $noExtendLeft: Op.noExtendLeft,
        //     $and: Op.and,
        //     $or: Op.or,
        //     $any: Op.any,
        //     $all: Op.all,
        //     $values: Op.values,
        //     $col: Op.col
        // };
        // configmysql["operatorsAliases"]=operatorsAliases;
        // configmysql.logging=false; //注释打开sql日志
        // this._sequelize = new Sequelize( configmysql );
        this._sequelize = new sequelize_typescript_1.Sequelize({
            database: configmysql.database,
            dialect: configmysql.dialect,
            username: configmysql.username,
            password: configmysql.password,
            storage: ':memory:',
            models: configmysql.modelPaths // or [Player, Team],
        });
        // const connection = new Sequelize(db, user, pass, { operatorsAliases });
    }
    static get instance() {
        if (null == SequelizeMgr._instance) {
            SequelizeMgr._instance = new SequelizeMgr();
        }
        return SequelizeMgr._instance;
    }
    authenticate() {
        this._sequelize.authenticate().then(() => {
            console.log('sequelize DataBase Connection has been established successfully:' + this._host);
            // this.initDataBaseConfig();
            SysEventManager_1.SysEventManager.instance.callEvent(SysEnumEvent_1.SysEnumEvent.sequelize_init_ok, []);
        }).catch(err => {
            console.error('Unable to connect to the database:' + this._host, err);
        });
    }
}
exports.SequelizeMgr = SequelizeMgr;
//# sourceMappingURL=SequelizeMgr.js.map