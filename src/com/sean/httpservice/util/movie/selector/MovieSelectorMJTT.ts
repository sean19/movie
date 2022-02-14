import {SelectorBase} from "./SelectorBase";
import {MovieVO} from "../../VO/MovieVO";
import {UtillQueryData} from "../../../../crawler/utillHttp/UtillQueryData";
import {UtillHttpSuperagent} from "../../../../crawler/utillHttp/UtillHttpSuperagent";
import {MovieConfigVO} from "../../VO/MovieConfigVO";
import {DemocCrawler} from "../../../../crawler/DemocCrawler";

    export class MovieSelectorMJTT extends SelectorBase{
        public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO,selector:Function = null):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];if(!$)return[];
            var len = $('.book-li').length;
            for(var i:number = 0;i<len;i++){
                var sr:MovieVO = new MovieVO();
                sr.title = $(".list_1 .book-li .listimg img")[i].attribs['alt'];
                sr.href=  $(".list_1 .book-li a")[i].attribs['href']
                sr.imgurl = this.getImglink($(".list_1 .book-li .listimg img")[i].attribs['src'],movieConfigVO);
                MovieVOArr.push(sr);
            }
            return MovieVOArr;
        }
        public getMovieInfoVOArr(res:object):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];if(!$)return[];

            var numWay = $('.test' ).length;
            for(var i:number = 0;i<numWay;i++){
                var wayid:number = i+1;
                var playway:string = $('div.test:nth-child('+wayid+') .arconix-toggle-title span:nth-child(1)').text();
                if(playway=="云播"){
                    var info:string = $('div.test:nth-child('+wayid+') .arconix-toggle-title span:nth-child(2)').text();
                    var numvo:number = $('div.test:nth-child('+wayid+') div.arconix-toggle-content.fn-clear a').length;
                    for(var j:number=0;j<numvo;j++){
                        var sr:MovieVO = new MovieVO();
                        sr.href=$('div.test:nth-child('+wayid+') div.arconix-toggle-content.fn-clear a')[j].attribs['href'];
                        sr.rel=$('div.test:nth-child('+wayid+') div.arconix-toggle-content.fn-clear a')[j].attribs['rel'];
                        sr.target=$('div.test:nth-child('+wayid+') div.arconix-toggle-content.fn-clear a')[j].attribs['target'];
                        var t = $('div.test:nth-child('+wayid+') div.arconix-toggle-content.fn-clear a')[j].attribs['title'];
                        if(t) {
                            sr.title=t?t:"";
                            sr.playway = playway;
                            sr.info=info;
                            MovieVOArr.push(sr);
                        }
                    }
                }

            }
            return MovieVOArr;
        }
        //**------------------------------------------
        //**------------------------------------------
        public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
            var m11kInfo:MovieVO  =new MovieVO();
            var $ = res["$"];if(!$)return null;
            try{
                var bofangurl = $("#bofang script")[0].attribs['src'];
                var ways:MJTTWayInfo[] = await this.getWayinfos(bofangurl,movieConfigVO);
                var ids:string=  link.substring(link.lastIndexOf('/'),link.indexOf('.'));
                var idinfo:string[] = ids.split('-');
                var mjw:MJTTWayInfo = ways[parseInt(idinfo[1])];
                var playinfo:MJTTPlayInfo = mjw.pls[parseInt(idinfo[2])];
                var playlink = playinfo.href;
                var from = playinfo.line;
                playlink = this.unCodeUrl(playlink,from);
                m11kInfo.playway = from;
                m11kInfo.href = playlink;
                m11kInfo.title = playinfo.tt;
                m11kInfo.playContent = this.getPlayContent(m11kInfo.href);
            }catch (e) {

            }
            return m11kInfo;
        }
        protected async getWayinfos(link,movieConfigVO:MovieConfigVO):Promise<MJTTWayInfo[]>{
            var targetUrl = movieConfigVO.host+link;
            var res =await new DemocCrawler().crawFromUrl(targetUrl);
            // UtillHttpSuperagent.gatUrlData(targetUrl,5,'gbk');
            var content = res['body'];
            content =content.substring(content.indexOf('['),content.lastIndexOf(']'));
            content=content.replace(/"/g,"")
            var arrway:MJTTWayInfo[] = this.getPlayInfo(content);
            return arrway;
        }
        protected getPlayInfo(str:string):MJTTWayInfo[]{
            var arr:string[] = str.split('[');
            var nar = this.getArrWithnoEMP(arr);
            var arrWay:MJTTWayInfo[] = [];
            for(var i:number=0;i<nar.length;i++){
                var way:MJTTWayInfo;
                var info:string = nar[i];
                if(info.indexOf(']')==-1){
                    if(way){
                        arrWay.push(way);
                    }
                    way = new MJTTWayInfo();
                    way.addWay(info);
                }else{
                    if(way){
                        way.addPls(info)
                        if(i==nar.length-1){
                            arrWay.push(way);
                        }
                    }

                }
            }
            return arrWay;
        }
        protected getArrWithnoEMP(arr:string[]):string[]{
            var nar:string[] = [];
            for(var i : number=0;i<arr.length;i++){
                if(arr[i]!=""){
                    nar.push(arr[i]);
                }
            }
            return nar;
        }
        public static getUncode(str:string):string{
            return eval("'" + str + "'");//unescape(str.replace(/\u/g, "%u"));
        }

        protected unCodeUrl(url,from) {
            var s, vurl;
            if (from == "\u0062\u0064\u0068\u0064" || from == "\u0071\u0076\u006f\u0064") {
                s = url.split("|");
                if (s[0].toLowerCase().indexOf("\u0065\u0064\u0032\u006b\u003a\u002f\u002f") == 0) {
                    vurl = s[0] + "|" + s[1] + "|" + s[2] + "|" + s[3] + "|" + s[4].substring(0, s[4].length - 5) + s[4].substring(s[4].length - 4) + "|";
                } else {
                    vurl = s[0] + "|" + s[1].substring(0, s[1].length - 5) + s[1].substring(s[1].length - 4) + "|" + s[2] + "|";
                }
            } else if (from == "\u0067\u0076\u006f\u0064") {
                s = url.replace("\u0067\u0076\u006f\u0064\u003a\u002f\u002f", "").split("/");
                vurl = "\u0067\u0076\u006f\u0064\u003a\u002f\u002f" + s[0] + "/" + s[1].substring(0, s[1].length - 5) + s[1].substring(s[1].length - 4) + "/" + s[2] + "/" + s[3];
            } else {
                vurl = url.substring(0, url.length - 5) + url.substring(url.length - 4);
            }
            return vurl;
        }
        //**------------------------------------------
        //**------------------------------------------

    }
export class MJTTWayInfo {
    public way:string;
    public pls:MJTTPlayInfo[] = [];
    public addWay(info:string){
        info=info.replace(',',"");
        this.way = MovieSelectorMJTT.getUncode(info);

    }
    public addPls(info:string){
        this.pls.push(new MJTTPlayInfo(info));
    }

}
export class MJTTPlayInfo {
    public tt:string;
    public href:string;
    public line:string;
    constructor(info){
        info=info.replace(']',"");

        var arr:string[] = info.split(',');
        this.tt=MovieSelectorMJTT.getUncode(arr[0]);
        this.href=arr[1];
        this.line= arr[2];

    }
}
