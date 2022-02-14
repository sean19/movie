import { Request, Response } from "express";
import {UtlHttp} from "../util/UtlHttp";
import {SequelizeMgr} from "../../SequelizeMgr";
import {TableBaseHandler} from "./tableHandler/TableBaseHandler";
import {HandlerNotNeedLogin} from "./HandlerNotNeedLogin";
import {HttpApiMgr} from "../HttpApiMgr";
import {ASIN} from "../../sqlTable/ASIN";
import {SysModifyLog} from "../../sqlTable/SysModifyLog";
import {json} from "body-parser";
import {UtilDY2018} from "../util/dy2018/UtilDY2018";
import {UtillHttpSuperagent} from "../../crawler/utillHttp/UtillHttpSuperagent";
import {UtillQueryData} from "../../crawler/utillHttp/UtillQueryData";
import {UtillDy2018FL} from "../util/dy2018/UtillDy2018FL";

export class GetDataFromAsinHandler extends HandlerNotNeedLogin {

    protected async onGetData(req:Request,res:Response, datastr:string):Promise<void> {
        // try {
            var msg = JSON.parse(datastr);
            let asincode = msg.asincode || '';
            // var ct:string = await UtilDY2018.getDy2018Main();
            await new UtillDy2018FL().getData(1);

            this.sendResult(res,{ "error":1002,"data": [] });
            console.log('end');
            return;

        //     var $ = UtillQueryData.getQueryData(ct);
        //
        //     var datastrs:string[] = await HttpApiMgr.instance.getASINDateFromUrl(asincode);
        //     if(datastrs.length!=0){
        //         let timestr:string = new Date().toLocaleString();
        //        var asobj:ASIN = await ASIN.findOne({where:{ASNICode:asincode}});
        //        //update ASIN product
        //        if(asobj){
        //            asobj.ASNIModel = datastrs[0];
        //            asobj.SalsesRank = datastrs[1];
        //            asobj.Dimensions = datastrs[2];
        //            asobj.update_time =new Date();
        //            asobj.save();
        //            this.sendResult(res,{ "error":0,"data": [asincode,datastrs[0],datastrs[1],datastrs[2]] });
        //        }else{
        //            //save new product
        //            var newobj:ASIN = await ASIN.create({ASNICode:asincode,ASNIModel:datastrs[0],SalsesRank:datastrs[1],Dimensions:datastrs[2],create_time:timestr,update_time:timestr});
        //            if(newobj){
        //                this.sendResult(res,{ "error":0,"data": [asincode,datastrs[0],datastrs[1],datastrs[2]] });
        //            }else{
        //                this.sendResult(res,{ "error":1001,"data": [] });
        //            }
        //        }
        //     }else{
        //         this.sendResult(res,{ "error":1002,"data": [] });
        //     }
        // } catch (e) {
        //     console.log(e)
        //     this.sendResult(res,{"error":1003, "data": [] });
        // }

    }
    protected sendResult(res:Response,result:object):void{
        res.json(result);
    }


}