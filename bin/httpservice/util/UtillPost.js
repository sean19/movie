"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtillPost = void 0;
class UtillPost {
    async nodePostGetRequest(HOST, path, PORT = '80', method = 'GET', post_data = null, bodydata = '', cokie = '') {
        return await new Promise((resolve, reject) => {
            var https = require('https');
            var zlib = require('zlib');
            var reqdata = JSON.stringify(post_data);
            var options = this.getOption(HOST, path, PORT, reqdata.length, cokie);
            var req = https.request(options, function (res) {
            });
            req.write(reqdata);
            var strcontent = "";
            req.on('data', function (response) {
                strcontent += response;
                console.log(strcontent);
            });
            req.on('end', function () {
                console.log(strcontent);
            });
            req.on('error', function (e) {
                console.log(new Error('problem with request: ' + e.message));
                req.end();
                // setTimeout(cb, 10);
            });
        });
    }
    getOption(host, path, PORT, reqdatalen, cokie) {
        var option = {
            hostname: host,
            port: PORT,
            // path: path,
            method: 'GET',
            rejectUnauthorized: false,
            requestCert: true,
            // auth: 'admin:123456************',
            headers: {
                // 'username': 'admin',
                // 'password': '123456************',
                'Cookie': cokie,
                // 'X-BuildTime': '2015-01-01 20:04:11',
                // 'Autologin': '4',
                // 'Accept-Encoding': 'gzip, deflate',
                'X-Timeout': '3600000',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Paw/3.1.7 (Macintosh; OS X/10.14.5) GCDHTTPRequest',
                "Content-Length": reqdatalen
            }
        };
        return option;
    }
}
exports.UtillPost = UtillPost;
//# sourceMappingURL=UtillPost.js.map