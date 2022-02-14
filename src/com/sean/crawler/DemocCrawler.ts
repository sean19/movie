export class DemocCrawler {
    public async crawFromUrl(url:string,userAgent:string = ''):Promise<object>{
        console.log("url=",url);
        return await new Promise<object>((resolve, reject) => {
            var Crawler = require("crawler");
            var c = new Crawler({
                maxConnections : 10,
                // 两次请求之间将闲置1000ms
                rateLimit: 2000,
                userAgent:userAgent,
                // This will be called for each crawled page
                callback : function (error, res, done) {
                    if(error){
                        // console.log(error);
                        resolve(null);
                    }else{
                        var $ = res.$;
                        resolve(res);
                        // console.log($("title").text());
                    }
                    done();
                }
            });
            c.queue(
                url
            );
        });

    }
}