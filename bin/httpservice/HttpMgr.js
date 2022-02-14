"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMgr = void 0;
const Index_1 = require("./Index");
const TableGetAllHandler_1 = require("./handlers/tableHandler/TableGetAllHandler");
const GetDataFromAsinHandler_1 = require("./handlers/GetDataFromAsinHandler");
const Get_movie_2_InfoDataHandler_1 = require("./handlers/Get_movie_2_InfoDataHandler");
const Get_movie_3_SeeMovieSeeHandler_1 = require("./handlers/Get_movie_3_SeeMovieSeeHandler");
const Get_tv_1_InfoDataHandler_1 = require("./handlers/Get_tv_1_InfoDataHandler");
const Get_movie_1_2_2_OptionDataHandler2_1 = require("./handlers/Get_movie_1_2_2_OptionDataHandler2");
const Get_movie_1_2_1_SearchDataHandler2_1 = require("./handlers/Get_movie_1_2_1_SearchDataHandler2");
const Get_movie_1_1_SearchDataHandler_1 = require("./handlers/Get_movie_1_1_SearchDataHandler");
const Get_book_1_1_SearchDataHandler_1 = require("./handlers/Get_book_1_1_SearchDataHandler");
const Get_book_2_InfoDataHandler_1 = require("./handlers/Get_book_2_InfoDataHandler");
const Get_book_2_ChapterDataHandler_1 = require("./handlers/Get_book_2_ChapterDataHandler");
const Movie_tuijian_1 = require("./handlers/Movie_tuijian");
const Movie_tuijian_get_1 = require("./handlers/Movie_tuijian_get");
const Get_html_3_check_info_handler_1 = require("./handlers/Get_html_3_check_info_handler");
const Get_html_1_data_handler_1 = require("./handlers/Get_html_1_data_handler");
const Get_html_2_check_list_handler_1 = require("./handlers/Get_html_2_check_list_handler");
const Get_html_4_test_info_handler_1 = require("./handlers/Get_html_4_test_info_handler");
const Get_html_5_upload_info_handler_1 = require("./handlers/Get_html_5_upload_info_handler");
const Get_html_6_download_info_1 = require("./handlers/Get_html_6_download_info");
const Config_book_get_handler_1 = require("./handlers/Config_book_get_handler");
const Config_book_update_handler_1 = require("./handlers/Config_book_update_handler");
const Config_page_get_handler_1 = require("./handlers/page/Config_page_get_handler");
const Config_page_set_handler_1 = require("./handlers/page/Config_page_set_handler");
const Config_page_get_platform_handler_1 = require("./handlers/page/Config_page_get_platform_handler");
class HttpMgr {
    constructor() {
        this.handlers = [];
    }
    init(app) {
        this.handlers.push(new Index_1.Index("/main"));
        //get talbe data from sql
        this.handlers.push(new TableGetAllHandler_1.TableGetAllHandler("/tableGet", "POST"));
        this.handlers.push(new GetDataFromAsinHandler_1.GetDataFromAsinHandler("/getDataFromAsin", "POST"));
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
        this.handlers.push(new Get_movie_1_1_SearchDataHandler_1.Get_movie_1_1_SearchDataHandler("/getMovieSearchData", "POST"));
        this.handlers.push(new Get_movie_1_2_1_SearchDataHandler2_1.Get_movie_1_2_1_SearchDataHandler2("/getMovieSearchData2", "POST"));
        this.handlers.push(new Get_movie_1_2_2_OptionDataHandler2_1.Get_movie_1_2_2_OptionDataHandler2("/getOptionData", "POST"));
        this.handlers.push(new Get_movie_2_InfoDataHandler_1.Get_movie_2_InfoDataHandler("/getMovieInfoData", "POST"));
        this.handlers.push(new Get_movie_3_SeeMovieSeeHandler_1.Get_movie_3_SeeMovieSeeHandler("/getMovieSeeData", "POST"));
        this.handlers.push(new Get_tv_1_InfoDataHandler_1.Get_tv_1_InfoDataHandler("/getTVInfoData", "POST"));
        this.handlers.push(new Get_html_1_data_handler_1.Get_html_1_data_handler("/gethtmldata", "POST"));
        this.handlers.push(new Get_html_2_check_list_handler_1.Get_html_2_check_list_handler("/getcheckhtmldatalist", "POST"));
        this.handlers.push(new Get_html_3_check_info_handler_1.Get_html_3_check_info_handler("/getcheckhtmlinfo", "POST"));
        this.handlers.push(new Get_html_4_test_info_handler_1.Get_html_4_test_info_handler("/testsearch", "POST"));
        this.handlers.push(new Get_html_5_upload_info_handler_1.Get_html_5_upload_info_handler("/uploadsearchinfo", "POST"));
        this.handlers.push(new Get_html_6_download_info_1.Get_html_6_download_info("/downloadsearchinfo", "POST"));
        this.handlers.push(new Config_book_get_handler_1.Config_book_get_handler("/getbookconfig", "POST"));
        this.handlers.push(new Config_book_update_handler_1.Config_book_update_handler("/updatebookconfig", "POST"));
        this.handlers.push(new Get_book_1_1_SearchDataHandler_1.Get_book_1_1_SearchDataHandler("/getBookSearchData", "POST"));
        this.handlers.push(new Get_book_2_ChapterDataHandler_1.Get_book_2_ChapterDataHandler("/getBookChapterData", "POST"));
        this.handlers.push(new Get_book_2_InfoDataHandler_1.Get_book_2_InfoDataHandler("/getBookInfoData", "POST"));
        this.handlers.push(new Movie_tuijian_1.Movie_tuijian("/tjmovie", "POST"));
        this.handlers.push(new Movie_tuijian_get_1.Movie_tuijian_get("/tjmovieget", "POST"));
        this.handlers.push(new Config_page_get_handler_1.Config_page_get_handler("/getpageconfig", "POST"));
        this.handlers.push(new Config_page_get_platform_handler_1.Config_page_get_platform_handler("/getPlatformPages", "POST"));
        this.handlers.push(new Config_page_set_handler_1.Config_page_set_handler("/setpageconfig", "POST"));
        // this.handlers.push( new TableGetAllHandler( "/fishOut" ,"POST"));
        // this.handlers.push( new OutUpdateHandler( "/outUpdate" ,"POST"));
        this.startHttpService(app);
    }
    startHttpService(app) {
        var handlers = this.handlers;
        var length = handlers.length;
        for (var i = 0; i < length; i++) {
            var handler = handlers[i];
            if (handler.type == "GET") {
                app.get(handler.path, handler.handl.bind(handler));
            }
            else {
                app.post(handler.path, handler.handl.bind(handler));
            }
        }
    }
}
exports.HttpMgr = HttpMgr;
//# sourceMappingURL=HttpMgr.js.map