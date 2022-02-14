"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableGetAllHandler = void 0;
const UtlHttp_1 = require("../../util/UtlHttp");
const SequelizeMgr_1 = require("../../../SequelizeMgr");
const TableBaseHandler_1 = require("./TableBaseHandler");
class TableGetAllHandler extends TableBaseHandler_1.TableBaseHandler {
    async onGetData(res, datastr) {
        try {
            console.log(datastr);
            var paramdata = UtlHttp_1.UtlHttp.getObjectFromUrlString(datastr);
            let whereObj = Object.assign({}, paramdata);
            delete whereObj.pageSize;
            delete whereObj.pageIndex;
            let outs = [];
            if (paramdata.pageSize == -1) {
                outs = await SequelizeMgr_1.SequelizeMgr.instance.SQ.model(this.tableName).findAll({
                    where: whereObj
                });
            }
            else {
                outs = await SequelizeMgr_1.SequelizeMgr.instance.SQ.model(this.tableName).findAll({
                    where: whereObj,
                    offset: paramdata.pageSize * paramdata.pageIndex,
                    limit: Number.parseInt(paramdata.pageSize)
                });
            }
            res.json({ data: outs });
        }
        catch (e) {
            console.log(e);
            res.json({ "data": [] });
        }
    }
}
exports.TableGetAllHandler = TableGetAllHandler;
//# sourceMappingURL=TableGetAllHandler.js.map