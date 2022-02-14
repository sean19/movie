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

export class Config_page_get_handler extends HandlerNotNeedLogin {

    protected async onGetData(req: Request, res: Response, datastr: string): Promise<void> {
        try {
            var msg = JSON.parse(datastr);
            let id = msg.id || '';

            var pageconfig: TConfigPage = await TConfigPage.findByPk(id);
            if (id == "" || pageconfig == null) {
                this.sendResult(res, { "error": 1, "data": "找不到数据" });
                return;
            }
            this.sendResult(res, { "error": 0, "data": pageconfig });
        } catch (err) {
            this.sendResult(res, { "error": 1, "data": JSON.stringify(err) });
        }
    }


}