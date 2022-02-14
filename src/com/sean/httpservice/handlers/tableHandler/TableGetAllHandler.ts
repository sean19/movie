import { Request, Response } from "express";
import {UtlHttp} from "../../util/UtlHttp";
import {SequelizeMgr} from "../../../SequelizeMgr";
import {TableBaseHandler} from "./TableBaseHandler";

export class TableGetAllHandler extends TableBaseHandler {

    protected async onGetData(res: Response, datastr: string): Promise<void> {
        try {
            console.log(datastr);
            var paramdata = UtlHttp.getObjectFromUrlString(datastr);
            let whereObj = Object.assign({}, paramdata)
            delete whereObj.pageSize
            delete whereObj.pageIndex
            let outs = []
            if (paramdata.pageSize == -1) {
                outs = await SequelizeMgr.instance.SQ.model(this.tableName).findAll({
                    where: whereObj
                })
            } else {
                outs = await SequelizeMgr.instance.SQ.model(this.tableName).findAll({
                    where: whereObj,
                    offset: paramdata.pageSize * paramdata.pageIndex,
                    limit: Number.parseInt(paramdata.pageSize)
                })
            }
            res.json({ data: outs });
        } catch (e) {
            console.log(e);
            res.json({ "data": [] });
        }

    }


}