import { HandlerNotNeedLogin } from "./HandlerNotNeedLogin";
import { Request, Response } from "express";
import { TestCrawler } from "../../crawler/TestCrawler";
import { BookAnlysis } from "../util/BookAnlysis";
import { WebCrawler } from "../../crawler/WebCrawler";
import { TConfigSelector } from "../../sqlTable/TConfigSelector";
import { TConfigBook } from "../../sqlTable/TConfigBook";
import { Sequelize } from "sequelize";
import { SequelizeMgr } from "../../SequelizeMgr";


export class Get_html_5_upload_info_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);

            let id  = msg.id || '';
            let info = msg.info || '';
            let url = msg.url || '';
            let selector = msg.selector || '';
            let attribs = msg.attribs || '';



            var isnew: boolean = false;
            var config: TConfigSelector = await TConfigSelector.findByPk(id);
            if (id != "" && config == null) {
                this.sendResult(res, { "error": 1, "data": "找不到"+id+"的数据" });
                return;
            }
            if (id == "") {
                isnew = true;
                config = new TConfigSelector();
            }
            config.info = info;
            config.url = url;
            config.selector = selector;
            config.attribs = JSON.stringify(attribs);
            config.updatedAt = new Date();

            await config.save();
            SequelizeMgr.instance.configSQL.initConfigClwaer();

            this.sendResult(res, { "error": 0, "data": isnew ? "【新】保存成功id=" + config.id : "【旧】修改成功" });

        }
        catch (err) {
            this.sendResult(res, { "error": 1, "data": err });

        }

    }
    protected sendResult(res: Response, result: object): void {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(result);
    }


}