import { SequelizeMgr } from "../SequelizeMgr";
import { TConfigClawer } from "../sqlTable/TConfigClawer";
import { UtillHttpSuperagent } from "./utillHttp/UtillHttpSuperagent";

export class TestCrawler {
    protected static tc: TestCrawler = new TestCrawler();
    public static get i(): TestCrawler {
        return TestCrawler.tc;
    }
    constructor() {
    }
    protected mycrawler;
    protected arrCrawlerData: CrawlerData[] = [];
    public async init() {
        var confi: TConfigClawer = SequelizeMgr.instance.configSQL.getConfigClwaerByPlatformID(1);
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
                console.log("error====" + error)
                var cds: CrawlerData[] = self.getCrawlerData(url);
                cds.forEach(cd => {
                    cd.callEnd(error, res)
                })

                done();
            }
        });
    }
    protected getCrawlerData(url: string): CrawlerData[] {
        var arrout: CrawlerData[] = [];
        for (var i: number = 0; i < this.arrCrawlerData.length; i++) {
            var cd: CrawlerData = this.arrCrawlerData[i];
            if (cd.url == url) {
                this.arrCrawlerData.splice(i, 1);
                arrout.push(cd);
                i--;
            }
        }
        return arrout;
    }
    public async getUrlData(url: string, title: string = ""): Promise<object> {
        // url = encodeURI(url);
        console.log("【1】" + title + "开始加载-------" + url)
        return await new Promise<object>((resolve, reject) => {
            this.crawFromUrl(url, title, (url, err, res) => {
                if (err == null) {
                    console.log("【3】" + title + "加载结果-------完成!");
                    resolve(res);
                } else {
                    console.log("【3】" + title + "加载结果-------错误：" + err)
                    resolve(null);
                }
            })
        });
    }
    protected crawFromUrl(url: string, title: string, endF: Function) {
        this.arrCrawlerData.push(new CrawlerData(url, title, endF));
        this.mycrawler.queue(url);
    }

}
class CrawlerData {
    public title: string;
    public url: string;
    public endfc: Function;
    constructor(url: string, title: string, endfc: Function) {
        this.title = title;
        this.url = url;
        this.endfc = endfc;
    }
    public callEnd(err, res) {
        if (this.endfc) this.endfc.apply(null, [this.url, err, res]);
        this.dispose();
    }
    public dispose() {
        this.endfc = null;
    }
}