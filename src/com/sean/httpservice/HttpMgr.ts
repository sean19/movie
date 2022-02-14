import { Index } from "./Index";
import { Express, NextFunction, Request, Response } from "express";
import {HandlerHttp} from "./handlers/HandlerHttp";
import {TableGetAllHandler} from "./handlers/tableHandler/TableGetAllHandler";
import {GetDataFromAsinHandler} from "./handlers/GetDataFromAsinHandler";
import {Get_movie_2_InfoDataHandler} from "./handlers/Get_movie_2_InfoDataHandler";
import {Get_movie_3_SeeMovieSeeHandler} from "./handlers/Get_movie_3_SeeMovieSeeHandler";
import {Get_tv_1_InfoDataHandler} from "./handlers/Get_tv_1_InfoDataHandler";
import {Get_movie_1_2_2_OptionDataHandler2} from "./handlers/Get_movie_1_2_2_OptionDataHandler2";
import {Get_movie_1_2_1_SearchDataHandler2} from "./handlers/Get_movie_1_2_1_SearchDataHandler2";
import {Get_movie_1_1_SearchDataHandler} from "./handlers/Get_movie_1_1_SearchDataHandler";
import {Get_book_1_1_SearchDataHandler} from "./handlers/Get_book_1_1_SearchDataHandler";
import {Get_book_2_InfoDataHandler} from "./handlers/Get_book_2_InfoDataHandler";
import {Get_book_2_ChapterDataHandler} from "./handlers/Get_book_2_ChapterDataHandler";
import {Movie_tuijian} from "./handlers/Movie_tuijian";
import {Movie_tuijian_get} from "./handlers/Movie_tuijian_get";
import { Get_html_3_check_info_handler } from "./handlers/Get_html_3_check_info_handler";
import { Get_html_1_data_handler } from "./handlers/Get_html_1_data_handler";
import { Get_html_2_check_list_handler } from "./handlers/Get_html_2_check_list_handler";
import { Get_html_4_test_info_handler } from "./handlers/Get_html_4_test_info_handler";
import { Get_html_5_upload_info_handler } from "./handlers/Get_html_5_upload_info_handler";
import { Get_html_6_download_info } from "./handlers/Get_html_6_download_info";
import { Config_book_get_handler } from "./handlers/Config_book_get_handler";
import { Config_book_update_handler } from "./handlers/Config_book_update_handler";
import { Config_page_get_handler } from "./handlers/page/Config_page_get_handler";
import { Config_page_set_handler } from "./handlers/page/Config_page_set_handler";
import { Config_page_get_platform_handler } from "./handlers/page/Config_page_get_platform_handler";

export class HttpMgr {
    private handlers: Array<HandlerHttp> = [];

    public init(app: Express): void {
        this.handlers.push(new Index("/main"));
        //get talbe data from sql
        this.handlers.push(new TableGetAllHandler("/tableGet", "POST"));
        this.handlers.push(new GetDataFromAsinHandler("/getDataFromAsin", "POST"));

        // this.handlers.push(new GetM11_1_SearchDataHandler("/getDataFromM11K", "POST"));
        // this.handlers.push(new GetM11_2_MoviePageHandler("/getMoviePageFromM11K", "POST"));
        // this.handlers.push(new GetM11_3_SeeMovieSeeHandler("/getMovieSeeFromM11K", "POST"));
        //
        // this.handlers.push(new GetMJTT_1_SearchDataHandler("/getDataFromMJTT", "POST"));
        // this.handlers.push(new GetMJTT_2_MoviePageHandler("/getMoviePageFromMJTT", "POST"));
        // this.handlers.push(new GetMJTT_3_SeeMovieSeeHandler("/getMovieSeeFromMJTT", "POST"));
        //
        //
        // this.handlers.push(new GetZP_1_SearchDataHandler("/getDataFromZP", "POST"));
        // this.handlers.push(new GetZP_2_MoviePageHandler("/getMoviePageFromZP", "POST"));
        // this.handlers.push(new GetZP_3_SeeMovieSeeHandler("/getMovieSeeFromZP", "POST"));

        this.handlers.push(new Get_movie_1_1_SearchDataHandler("/getMovieSearchData", "POST"));
        this.handlers.push(new Get_movie_1_2_1_SearchDataHandler2("/getMovieSearchData2", "POST"));
        this.handlers.push(new Get_movie_1_2_2_OptionDataHandler2("/getOptionData", "POST"));
        this.handlers.push(new Get_movie_2_InfoDataHandler("/getMovieInfoData", "POST"));
        this.handlers.push(new Get_movie_3_SeeMovieSeeHandler("/getMovieSeeData", "POST"));

        this.handlers.push(new Get_tv_1_InfoDataHandler("/getTVInfoData", "POST"));

        this.handlers.push(new Get_html_1_data_handler("/gethtmldata", "POST"));
        this.handlers.push(new Get_html_2_check_list_handler("/getcheckhtmldatalist", "POST"));
        this.handlers.push(new Get_html_3_check_info_handler("/getcheckhtmlinfo", "POST"));
        this.handlers.push(new Get_html_4_test_info_handler("/testsearch", "POST"));
        this.handlers.push(new Get_html_5_upload_info_handler("/uploadsearchinfo", "POST"));
        this.handlers.push(new Get_html_6_download_info("/downloadsearchinfo", "POST"));

        this.handlers.push(new Config_book_get_handler("/getbookconfig", "POST"));
        this.handlers.push(new Config_book_update_handler("/updatebookconfig", "POST"));
        

        this.handlers.push(new Get_book_1_1_SearchDataHandler("/getBookSearchData", "POST"));
        this.handlers.push(new Get_book_2_ChapterDataHandler("/getBookChapterData", "POST"));
        this.handlers.push(new Get_book_2_InfoDataHandler("/getBookInfoData", "POST"));




        this.handlers.push(new Movie_tuijian("/tjmovie", "POST"));
        this.handlers.push(new Movie_tuijian_get("/tjmovieget", "POST"));



        this.handlers.push(new Config_page_get_handler("/getpageconfig", "POST"));
        this.handlers.push(new Config_page_get_platform_handler("/getPlatformPages", "POST"));
        this.handlers.push(new Config_page_set_handler("/setpageconfig", "POST"));




        // this.handlers.push( new TableGetAllHandler( "/fishOut" ,"POST"));
        // this.handlers.push( new OutUpdateHandler( "/outUpdate" ,"POST"));
        this.startHttpService(app);
    }
    public startHttpService(app: Express): void {
        var handlers: Array<HandlerHttp> = this.handlers;
        var length: number = handlers.length;
        for (var i: number = 0; i < length; i++) {
            var handler: HandlerHttp = handlers[i];
            if (handler.type == "GET") {
                app.get(handler.path, handler.handl.bind(handler));
            }
            else {
                app.post(handler.path, handler.handl.bind(handler));
            }
        }


    }
}
