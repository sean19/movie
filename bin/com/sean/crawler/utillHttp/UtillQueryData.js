"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillQueryData = void 0;
class UtillQueryData {
    static getQueryData(content) {
        const cheerio = require("cheerio");
        var $ = cheerio.load(content);
        return $;
    }
}
exports.UtillQueryData = UtillQueryData;
//# sourceMappingURL=UtillQueryData.js.map