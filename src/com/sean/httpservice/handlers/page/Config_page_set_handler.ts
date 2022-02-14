import { Request, Response } from "express";
import { HandlerNotNeedLogin } from "../HandlerNotNeedLogin";
import { MovieVO } from "../../util/VO/MovieVO";
import { RecordSearch } from "../../../sqlTable/RecordSearch";
import { MovieClawer } from "../../util/movie/MovieClawer";
import { ConfigMgr } from "../../../ConfigMgr";
import { MovieConfigVO } from "../../util/VO/MovieConfigVO";
import { MovieEngin } from "../../util/movie/engin/MovieEngin";
import { TestCrawler } from "../../../crawler/TestCrawler";
import { BookAnlysis } from "../../util/BookAnlysis";
import { BookConfig } from "../../util/BookConfig";
import { PostCrawler } from "../../../crawler/PostCrawler";
import { TConfigBook } from "../../../sqlTable/TConfigBook";
import { SequelizeMgr } from "../../../SequelizeMgr";
import { TConfigPage } from "../../../sqlTable/TConfigPage";

export class Config_page_set_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.id || '';
            let des = msg.des || '';
            let platform = msg.platform || '';
            let model = msg.model || '';
            let json = msg.json || '';
            let code = msg.code || '';

            var pageconfig: TConfigPage = await TConfigPage.findByPk(id);
            if(platform =="1" ||( pageconfig && pageconfig.platform=="1" && code !="sean")){
                this.sendResult(res, { "error": 1, "data": "不能上传平台为1的配置信息！" });
                return;
            }
            if (!pageconfig) {
                pageconfig = new TConfigPage();
                pageconfig.isNewRecord = true;
            }
            pageconfig.platform = platform;
            pageconfig.model = model;
            pageconfig.description = des;
            pageconfig.json = JSON.stringify(json);
            pageconfig.update_time = new Date();
            await pageconfig.save();

            this.sendResult(res, { "error": 0, "data": pageconfig });
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }


}