"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillHttpPuppeteer = void 0;
class UtillHttpPuppeteer {
    static async gatUrlData(url) {
        const puppeteer = require('puppeteer');
        var userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
        var browser = await puppeteer.launch({ headless: false });
        var time = 25000;
        // 打开新页面
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.setViewport({ width: 60, height: 80 });
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'image')
                request.abort();
            else
                request.continue();
        });
        // 访问
        console.log("puppeteer load:" + url);
        let datastr = "";
        try {
            await page.goto(url).catch(e => { console.log('eeee1' + e); });
            await page.waitFor(5000);
            datastr = await page.content().catch(e => { });
            // console.log(datastr)
        }
        catch (e) {
            // console.log("page err:"+e);
        }
        await browser.close();
        return datastr ? datastr : "";
    }
}
exports.UtillHttpPuppeteer = UtillHttpPuppeteer;
//# sourceMappingURL=UtillHttpPuppeteer.js.map