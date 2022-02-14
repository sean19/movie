import {ErrorMgr} from "./ErrorMgr/ErrorMgr";
import {ConfigMgr} from "../ConfigMgr";
import {UtillHttpSuperagent} from "../crawler/utillHttp/UtillHttpSuperagent";
import {UtilDY2018} from "./util/dy2018/UtilDY2018";
import {UtilGetFromASINCode} from "./util/amazon/UtilGetFromASINCode";

export class HttpApiMgr {
    private static _instance:HttpApiMgr;
    public static get instance():HttpApiMgr{
        if(HttpApiMgr._instance==null){
            HttpApiMgr._instance = new HttpApiMgr();
        }
        return HttpApiMgr._instance;
    }


    /**
     * get fata from asincode
     * @param {string} code
     * @returns {Promise<string[]>}
     */
    public async getASINDateFromUrl(asincode:string):Promise<string[]>{
        var dataStr:string[] =await  UtilGetFromASINCode.getFromASINCode(asincode);
        return dataStr;
    }
}