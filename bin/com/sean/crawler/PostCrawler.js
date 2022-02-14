"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCrawler = void 0;
class PostCrawler {
    constructor() {
        this.arrCrawlerData = [];
        this.init();
    }
    static get i() {
        return PostCrawler.tc;
    }
    init(userAgent = '') {
        var Crawler = require("crawler");
        var self = this;
        this.mycrawler = new Crawler({
            maxConnections: 20,
            method: "POST",
            // 两次请求之间将闲置1000ms
            // rateLimit: 2000,
            userAgent: userAgent,
            // This will be called for each crawled page
            callback: function (error, res, done) {
                var url = res.options.uri;
                var cd = self.getCrawlerData(url);
                if (cd)
                    cd.callEnd(error, res);
                done();
            }
        });
    }
    getCrawlerData(url) {
        for (var i = 0; i < this.arrCrawlerData.length; i++) {
            var cd = this.arrCrawlerData[i];
            if (cd.url == url) {
                this.arrCrawlerData.splice(i, 1);
                return cd;
            }
        }
        return null;
    }
    async getUrlData(url, arrdate) {
        console.log(url);
        return await new Promise((resolve, reject) => {
            this.crawFromUrl(url, arrdate, (url, err, res) => {
                resolve(res);
            });
        });
    }
    crawFromUrl(url, arrdate, endF) {
        var cd = this.getCrawlerData(url);
        if (cd)
            cd.callEnd(1, "");
        this.arrCrawlerData.push(new CrawlerData(url, endF));
        var data = { uri: url };
        arrdate.forEach(s => {
            var arrs = s.split('=');
            data[arrs[0]] = arrs[1];
        });
        this.mycrawler.queue(data);
    }
}
exports.PostCrawler = PostCrawler;
PostCrawler.tc = new PostCrawler();
class CrawlerData {
    constructor(url, endfc) {
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
//# sourceMappingURL=PostCrawler.js.map