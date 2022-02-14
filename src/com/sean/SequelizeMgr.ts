import { Sequelize } from "sequelize-typescript";
import {ConfigMgr} from "./ConfigMgr";
import { ConfigSQL } from "./ConfigSQL";
import { SysEnumEvent } from "./sysEvents/SysEnumEvent";
import { SysEventManager } from "./sysEvents/SysEventManager";


export class SequelizeMgr
{
    private static _instance:SequelizeMgr;
    public configSQL:ConfigSQL;
    private _sequelize:Sequelize;
    private _host:string="";
    public  get SQ():Sequelize
    {
        return this._sequelize;
    }

    constructor()
    {
    }
    public init ()
    {
        this.configSQL = new ConfigSQL();
        var configmysql = ConfigMgr.instance.getDbConfig();// .getConfig(ConfigKey.mysql);
        console.log(configmysql);
        configmysql.modelPaths = [ __dirname + "/sqlTable"];
        this._host=configmysql.host;
        this._sequelize = new Sequelize({
            database:configmysql.database,
            dialect:configmysql.dialect,
            username:configmysql.username,
            password: configmysql.password,
            storage: ':memory:',
            host:configmysql.host,
            port:configmysql.port,
            models: configmysql.modelPaths // or [Player, Team],
          })

        // const connection = new Sequelize(db, user, pass, { operatorsAliases });

        
    }
    public static get instance():SequelizeMgr
    {
        if( null == SequelizeMgr._instance )
        {
            SequelizeMgr._instance = new SequelizeMgr();
        }

        return SequelizeMgr._instance;
    }

    public authenticate():void
    {
        this._sequelize.authenticate().then(() => {
            console.log('sequelize DataBase Connection has been established successfully:'+this._host);
            // this.initDataBaseConfig();
            SysEventManager.instance.callEvent(SysEnumEvent.sequelize_init_ok,[]);

        }).catch(err => {
                console.error('Unable to connect to the database:'+this._host, err);
        } );
    }
}