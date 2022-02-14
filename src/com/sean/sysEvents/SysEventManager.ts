import {SysEventInfo} from "./SysEventInfo";
import {SysEnumEvent} from "./SysEnumEvent";

export class SysEventManager
{
    private static _instance:SysEventManager;
    public static get instance():SysEventManager
    {
        if( null == SysEventManager._instance )
        {
            SysEventManager._instance = new SysEventManager();
        }

        return SysEventManager._instance;
    }

    protected arr_info:SysEventInfo[] = [];
    public addCallBack(evt:SysEnumEvent, fc:Function):void
    {
        if(this.getEvent(evt,fc)!=null)return;
        this.arr_info.push(new SysEventInfo(evt,fc));
    }
    public removeCallBack(evt:SysEnumEvent, fc:Function):void
    {
        for(var i:number=0;i<this.arr_info.length;i++)
        {
            var info:SysEventInfo = this.arr_info[i];
            if(info.evt==evt&&info.fc==fc)
            {
                info.dispose();
                this.arr_info.splice(i,1);
                return;
            }
        }
    }
    public callEvent(evt:SysEnumEvent, param:any[]):void
    {
        for(var i:number=0;i<this.arr_info.length;i++)
        {
            var info:SysEventInfo = this.arr_info[i];
            if(info.evt==evt)
            {
                info.callfc(param);
            }
        }
    }
    protected getEvent(evt:SysEnumEvent, fc:Function):SysEventInfo
    {
        for(var i:number=0;i<this.arr_info.length;i++)
        {
            var info:SysEventInfo = this.arr_info[i];
            if(info.evt==evt&&info.fc==fc)
            {
                return info;
            }
        }
        return null;
    }
}