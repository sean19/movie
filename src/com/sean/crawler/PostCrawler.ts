export class PostCrawler {
    protected static tc:PostCrawler = new PostCrawler();
    public static get i():PostCrawler{
        return PostCrawler.tc;
    }
    constructor(){
        this.init();
    }
    protected mycrawler;
    protected arrCrawlerData:CrawlerData[] = [];
    protected init(userAgent:string = ''):void{
        var Crawler = require("crawler");
        var self= this;
        this.mycrawler = new Crawler({
            maxConnections : 20,
            method:"POST",
            // 两次请求之间将闲置1000ms
            // rateLimit: 2000,
            userAgent:userAgent,
            // This will be called for each crawled page
            callback : function (error, res, done) {
                var url = res.options.uri;
                var cd:CrawlerData = self.getCrawlerData(url);
                if(cd)cd.callEnd(error,res)
                done();
            }
        });
    }
    protected getCrawlerData(url:string):CrawlerData{
        for(var i:number=0;i<this.arrCrawlerData.length;i++){
            var cd:CrawlerData = this.arrCrawlerData[i];
            if(cd.url == url){
                this.arrCrawlerData.splice(i,1);
                return cd;
            }
        }
        return null;
    }
    public async getUrlData(url:string,arrdate:string[]):Promise<object>{
        console.log(url)
        return await new Promise<object>((resolve, reject) => {
            this.crawFromUrl(url,arrdate,(url,err,res)=>{
                resolve(res);
            })
        });
    }
    protected crawFromUrl(url:string,arrdate:string[],endF:Function){
        var cd:CrawlerData = this.getCrawlerData(url);
        if(cd)cd.callEnd(1,"");
       this.arrCrawlerData.push(new CrawlerData(url,endF));
       var data = {uri:url}
       arrdate.forEach(s=>{
           var arrs = s.split('=');
           data[arrs[0]]=arrs[1];
       })
        this.mycrawler.queue(data);
    }

}
class CrawlerData {
    public url:string;
    public endfc:Function;
    constructor(url:string,endfc:Function){
        this.url = url;
        this.endfc = endfc;
    }
    public callEnd(err,res){
        if(this.endfc)this.endfc.apply(null,[this.url,err,res]);
        this.dispose();
    }
    public dispose(){
        this.endfc = null;
    }
}