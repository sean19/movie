"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCrawler = void 0;
const SequelizeMgr_1 = require("../SequelizeMgr");
class TestCrawler {
    constructor() {
        this.arrCrawlerData = [];
    }
    static get i() {
        return TestCrawler.tc;
    }
    async init() {
        var confi = SequelizeMgr_1.SequelizeMgr.instance.configSQL.getConfigClwaerByPlatformID(1);
        var Crawler = require("crawler");
        var self = this;
        console.log("超时时间:" + confi.retryTimeout + "userAgent====" + confi.userAgent);
        this.mycrawler = new Crawler({
            maxConnections: confi.maxConnections,
            retries: confi.retries,
            retryTimeout: confi.retryTimeout,
            // 两次请求之间将闲置1000ms
            // rateLimit: 2000,
            userAgent: confi.userAgent,
            // This will be called for each crawled page
            callback: function (error, res, done) {
                var url = res.options.uri;
                console.log("error====" + error);
                var cds = self.getCrawlerData(url);
                cds.forEach(cd => {
                    cd.callEnd(error, res);
                });
                done();
            }
        });
    }
    getCrawlerData(url) {
        var arrout = [];
        for (var i = 0; i < this.arrCrawlerData.length; i++) {
            var cd = this.arrCrawlerData[i];
            if (cd.url == url) {
                this.arrCrawlerData.splice(i, 1);
                arrout.push(cd);
                i--;
            }
        }
        return arrout;
    }
    async getUrlData(url, title = "") {
        // url = encodeURI(url);
        console.log("【1】" + title + "开始加载-------" + url);
        return await new Promise((resolve, reject) => {
            this.crawFromUrl(url, title, (url, err, res) => {
                if (err == null) {
                    console.log("【3】" + title + "加载结果-------完成!");
                    resolve(res);
                }
                else {
                    console.log("【3】" + title + "加载结果-------错误：" + err);
                    resolve(null);
                }
            });
        });
    }
    crawFromUrl(url, title, endF) {
        this.arrCrawlerData.push(new CrawlerData(url, title, endF));
        this.mycrawler.queue(url);
    }
}
exports.TestCrawler = TestCrawler;
TestCrawler.tc = new TestCrawler();
class CrawlerData {
    constructor(url, title, endfc) {
        this.title = title;
        this.url = url;
        this.endfc = endfc;
    }
    callEnd(err, res) {
        if (this.endfc)
            this.endfc.apply(null, [this.url, err, res]);
        this.dispose();
    }
    dispose() {
        this.endfc = null;
    }
}
//# sourceMappingURL=TestCrawler.js.map