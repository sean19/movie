export class UtillQueryData {
    public static   getQueryData(content:string):Function{
        const cheerio    = require("cheerio");
        var $ = cheerio.load(content);
        return $;
    }
}