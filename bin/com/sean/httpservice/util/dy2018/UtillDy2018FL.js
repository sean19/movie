"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillDy2018FL = void 0;
const UtillHttpPuppeteer_1 = require("../../../crawler/utillHttp/UtillHttpPuppeteer");
const UtilDY2018_1 = require("./UtilDY2018");
const UtillQueryData_1 = require("../../../crawler/utillHttp/UtillQueryData");
const UtillDY2018PageInfoFL_1 = require("./UtillDY2018PageInfoFL");
/**
 * 获取分类的数据
 */
class UtillDy2018FL {
    constructor() {
        this.mv_type = 0;
        this.page_get_index = 1;
        this.page_total = 100;
        this.page_item_num = 30;
    }
    async getData(mv_type) {
        this.mv_type = mv_type;
        while (this.page_get_index <= this.page_total) {
            await this.getPage();
        }
    }
    async getPage() {
        console.log("【2】正在获取:" + UtilDY2018_1.UtilDY2018.getFLName(this.mv_type) + "第" + this.page_get_index + "/" + this.page_total + "页");
        var arr_items = [];
        var arr = [];
        var retry_num = 50;
        while (arr.length == 0 && --retry_num >= 0) {
            arr = await this.getPageItems(this.mv_type, this.page_get_index);
        }
        arr_items = arr_items.concat(arr);
        console.log("【2】获取到页面数据:" + UtilDY2018_1.UtilDY2018.getFLName(this.mv_type) + "第" + this.page_get_index + "/" + this.page_total + "页" + arr_items.length + "/" + this.page_item_num);
        for (var i = 0; i < arr_items.length; i++) {
            await this.getPageInfo(arr_items[i]);
        }
        this.page_get_index++;
    }
    async getPageItems(mv_type, page_index) {
        var url = UtilDY2018_1.UtilDY2018.url + '/' + mv_type + '/index' + (page_index == 1 ? '' : '_' + page_index) + '.html';
        var content = await UtillHttpPuppeteer_1.UtillHttpPuppeteer.gatUrlData(url);
        var mvs = [];
        if (content == "") {
            console.log("cannot open web!" + url);
        }
        else {
            var $ = UtillQueryData_1.UtillQueryData.getQueryData(content);
            var len = $('.bd3 .bd3r .co_area2 .co_content8 table').length;
            for (var i = 1; i <= len; i++) {
                mvs.push(this.getImteInfo($, mv_type, page_index, i));
            }
            this.page_total = this.gettotalPage($('.co_area2 .x p').text());
        }
        return mvs;
    }
    gettotalPage(str) {
        var st = str.indexOf('/') + 1;
        var ed = str.indexOf('每') - 1;
        var nm = Number(str.substring(st, ed));
        return nm ? (nm > 100 ? nm : 100) : 100;
    }
    getImteInfo($, mv_type, page_index, i) {
        var title = $('.bd3 .bd3r .co_area2 .co_content8 table:nth-child(' + i + ') a')[1].children[0].data;
        var item = $('.bd3 .bd3r .co_area2 .co_content8 table:nth-child(' + i + ') a')[0].children[0].data;
        var href = $('.bd3 .bd3r .co_area2 .co_content8 table:nth-child(' + i + ') a')[1].attribs['href'];
        return new ItemInfo(mv_type, page_index, title, item, UtilDY2018_1.UtilDY2018.url + href);
    }
    //=====获取详情页面的数据
    async getPageInfo(itemInfo) {
        var pageinfo = new UtillDY2018PageInfoFL_1.UtillDY2018PageInfoFL(itemInfo.mv_type + "", itemInfo.page_index + "");
        var arr = await pageinfo.getPageInfo(itemInfo.title, itemInfo.href);
    }
}
exports.UtillDy2018FL = UtillDy2018FL;
class ItemInfo {
    constructor(mv_type, page_index, title, item, href) {
        this.mv_type = mv_type;
        this.page_index = page_index;
        this.title = title;
        this.item = item;
        this.href = href;
    }
}
//# sourceMappingURL=UtillDy2018FL.js.map