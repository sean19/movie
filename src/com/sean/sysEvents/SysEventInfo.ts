import {SysEnumEvent} from "./SysEnumEvent";

export class SysEventInfo{
    public evt:SysEnumEvent;
    public fc:Function;
    public constructor (evt:SysEnumEvent, fc:Function){
        this.evt=evt;
        this.fc=fc;
    }
    public  callfc(param:any[]):void
     {
         this.fc.apply(null,param);
     }public dispose():void
    {
        this.fc=null;

    }


}