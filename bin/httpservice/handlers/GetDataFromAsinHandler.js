"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataFromAsinHandler = void 0;
const HandlerNotNeedLogin_1 = require("./HandlerNotNeedLogin");
const UtillDy2018FL_1 = require("../util/dy2018/UtillDy2018FL");
class GetDataFromAsinHandler extends HandlerNotNeedLogin_1.HandlerNotNeedLogin {
    async onGetData(req, res, datastr) {
        // try {
        var msg = JSON.parse(datastr);
        let asincode = msg.asincode || '';
        // var ct:string = await UtilDY2018.getDy2018Main();
        await new UtillDy2018FL_1.UtillDy2018FL().getData(1);
        this.sendResult(res, { "error": 1002, "data": [] });
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
    sendResult(res, result) {
        res.json(result);
    }
}
exports.GetDataFromAsinHandler = GetDataFromAsinHandler;
//# sourceMappingURL=GetDataFromAsinHandler.js.map