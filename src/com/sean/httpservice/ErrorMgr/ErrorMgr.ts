import {LogManager} from "../../log/LogManager";

export class ErrorMgr {
    private static _instance:ErrorMgr;
    public static get instance():ErrorMgr{
        if(ErrorMgr._instance==null){
            ErrorMgr._instance = new ErrorMgr();
        }
        return ErrorMgr._instance;
    }
    public onerr(e:any,type:ErrEnumType=ErrEnumType.err_sys):void
    {
        LogManager.instance.onerror(e);
        // console.log(e);
    }
}
export enum ErrEnumType {
    err_sys=1,
    err_data =2
}