"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCrawler = void 0;
class WebCrawler {
    //=============================================================
    //=============================================================
    //=============================================================
    //=============================================================
    getlistdata(info, selector) {
        var $ = this.getHtmlObj(info.body);
        return this.getHtmlSelectorList($, selector);
    }
    getinfodata(info, datatype, selector, child, name, path, att, deel) {
        var $ = this.getHtmlObj(info.body);
        var outdata = this.getHtmlinfodata($, datatype, selector, child, path, att, deel);
        return outdata;
    }
    getinfodatalist(info, datatype, selector, attribs, host = null, platform = "1") {
        var arrout = [];
        var cheerio = require('cheerio');
        var $ = this.getHtmlObj(info.body);
        var arrdata = this.getHtmlSelectorList($, selector);
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            var child = "" + (i + 1);
            var obj = {};
            arrout.push(obj);
            var lenatt = attribs.length;
            for (var j = 0; j < lenatt; j++) {
                var attribobj = attribs[j];
                var nm = attribobj.name;
                var path = attribobj.path;
                var att = attribobj.att;
                var deel = attribobj.deel;
                var info = this.getHtmlinfodata($, datatype, selector, child, path, att, deel);
                if (info && host != null) {
                    if (info.indexOf("/") == 0) {
                        if (host.lastIndexOf('/') == host.length - 1) {
                            info = host + info.substring(1, info.length);
                        }
                        else {
                            info = host + info;
                        }
                    }
                }
                if (!info) {
                    info = '';
                }
                obj[nm] = info;
                obj["platform"] = platform;
            }
        }
        return arrout;
    }
    getHtmlObj(str) {
        var cheerio = require('cheerio');
        var $ = cheerio.load(str);
        return $;
    }
    getHtmlSelectorList(htmlobj, selector) {
        var data = htmlobj(selector);
        return data;
    }
    getHtmlinfodata(htmlobj, datatype, selector, child, path, att, deel) {
        var outdata = null;
        let newselecter = selector + ":nth-child(" + child + ") " + (path == "" ? "" : "> " + path);
        if (att == "") {
            newselecter = selector;
        }
        var data;
        if (datatype == "2") {
            data = htmlobj[path];
        }
        else {
            var data = htmlobj(newselecter);
            switch (att) {
                case "text":
                    outdata = data.text();
                    break;
                case "all":
                    outdata = data.html();
                    break;
                case "":
                    outdata = data.text();
                    break;
                default:
                    if (data[0]) {
                        outdata = data[0].attribs[att];
                    }
                    break;
            }
        }
        if (deel && deel != "") {
            outdata = outdata.replace(/[\\]/g, '');
            return this.getdelldata(outdata, deel);
        }
        else {
            return outdata;
        }
    }
    //===============================================处理数据
    //===============================================处理数据
    //===============================================处理数据
    getdelldata(datastr, deel) {
        var objdeel = JSON.parse(deel);
        for (var i = 0; i < objdeel.length; i++) {
            var obj = objdeel[i];
            datastr = this.dooDeel(datastr, obj);
        }
        // var arrdeel: string[] = deel.split('+');
        // for (var i: number = 0; i < arrdeel.length; i++) {
        //     console.log(datastr + "deel===" + arrdeel[i])
        //     datastr = this.dooDeel(datastr, arrdeel[i]);
        //     console.log("strout=" + datastr);
        // }
        return datastr;
    }
    dooDeel(datastr, deelobj) {
        var strout = datastr;
        var strtype = deelobj['title'];
        switch (strtype) {
            case "substr":
                strout = this.deelsubstr(datastr, deelobj.param);
                break;
            case "replace":
                strout = this.deelreplace(datastr, deelobj.param);
                break;
            case "json":
                strout = this.deeljson(datastr, deelobj.param);
                break;
            case "get":
                strout = this.deelget(datastr, deelobj.param);
                break;
        }
        return strout;
    }
    deelsubstr(datastr, deelstr) {
        var arrdeel = deelstr.split('@');
        var str1 = arrdeel[0];
        var str2 = arrdeel[1];
        var start = datastr.indexOf(str1) + str1.length;
        if (!str1 || str1 == "")
            start = 0;
        var end = datastr.indexOf(str2);
        if (!str2 || str2 == "")
            end = datastr.length;
        return datastr.substring(start, end);
    }
    deelreplace(datastr, deelstr) {
        var arrdeel = deelstr.split('@');
        var str1 = arrdeel[0];
        var str2 = arrdeel[1];
        return datastr.replace(str1, str2);
    }
    deeljson(datastr, deelstr) {
        try {
            var obj = JSON.parse(datastr);
            return obj;
        }
        catch (err) {
            console.log('deeljson' + err.message);
        }
        return datastr;
    }
    deelget(datastr, deelstr) {
        return datastr[deelstr];
    }
    //===============================================处理数据
    //===============================================处理数据
    //===============================================处理数据
    //=============================================================
    //=============================================================
    //=============================================================
    //=============================================================
    //=============================================================
    getResult(res, conf, host) {
        var arrout = [];
        var selectors = conf["selectors"];
        var attribs = conf["attribs"];
        for (var i = 0; i < selectors.length; i++) {
            var arr = this.getDataArr(res, selectors[i], attribs, host);
            arrout.push(arr);
        }
        return arrout;
    }
    dogetdata(r, selector, attribs, host) {
        try {
            var nds = r(selector);
            var resaults = [];
            if (nds) {
                for (var i = 0; i < nds.length; i++) {
                    var obj = {};
                    attribs.forEach(attObj => {
                        var name = attObj["name"];
                        var path = attObj["path"];
                        var att = attObj["att"];
                        var ph = selector + (path == "" || path == "m" ? "" : ":nth-child(" + (i + 1) + ")" + path);
                        var nd = r(ph);
                        if (path == "m") {
                            nd = nd[i];
                        }
                        if (nd) {
                            var stratt = nd;
                            var arratt = att.split('.');
                            arratt.forEach(attstr => {
                                if (stratt && attstr != "") {
                                    if (attstr == "text") {
                                        stratt = r(ph).toString();
                                    }
                                    else {
                                        stratt = stratt[attstr];
                                    }
                                }
                            });
                            if (stratt) {
                                if (stratt.indexOf("/") == 0) {
                                    if (host.lastIndexOf('/') == host.length - 1) {
                                        stratt = host + stratt.substring(1, stratt.length);
                                    }
                                    else {
                                        stratt = host + stratt;
                                    }
                                }
                                if (arratt[arratt.length - 1] == "data") {
                                    stratt = stratt.replace(/\r/g, "");
                                    stratt = stratt.replace(/\n/g, "");
                                    stratt = stratt.replace(/\t/g, "");
                                }
                            }
                            obj[name] = stratt;
                        }
                    });
                    resaults.push(obj);
                }
            }
            return resaults;
        }
        catch (e) {
            return null;
        }
    }
    getDataArr(res, selector, attribs, host) {
        var r = res["$"];
        return this.dogetdata(r, selector, attribs, host);
    }
}
exports.WebCrawler = WebCrawler;
//# sourceMappingURL=WebCrawler.js.map