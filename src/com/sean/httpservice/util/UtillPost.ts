import {stringify} from "querystring";

export class UtillPost {


    public async nodePostGetRequest(HOST:string, path:string,PORT:string='80', method:string='GET',post_data:object=null, bodydata:string='',  cokie:string=''):Promise<string> {
        return await new Promise<string>((resolve, reject) => {
            var https = require('https');
            var zlib = require('zlib');
            var reqdata:string=JSON.stringify(post_data);
            var options = this.getOption(HOST,path,PORT,reqdata.length,cokie);

            var req = https.request(options, function (res) {
            });
            req.write(reqdata);
            var strcontent = "";
            req.on('data', function (response) {
                strcontent+=response;
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
    protected getOption(host:string,path:string,PORT:string,reqdatalen:number,cokie:string):{}{
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
                'Content-Type': 'application/x-www-form-urlencoded',//'application/octet-stream',
                'User-Agent': 'Paw/3.1.7 (Macintosh; OS X/10.14.5) GCDHTTPRequest',
                "Content-Length":reqdatalen
            }
        };

        return option;
    }
}