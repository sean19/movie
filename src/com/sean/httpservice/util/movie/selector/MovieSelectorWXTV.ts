import {SelectorBase} from "./SelectorBase";
import {MovieVO} from "../../VO/MovieVO";
import {UtillQueryData} from "../../../../crawler/utillHttp/UtillQueryData";
import {MovieConfigVO} from "../../VO/MovieConfigVO";

    export class MovieSelectorWXTV extends SelectorBase{
        public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            if(res==null)return [];
            var $ = res["$"];
            if($==null)return [];
            var len = $('#data_list > li').length;
            for(var i:number = 0;i<len;i++){
                var movieVO:MovieVO = new MovieVO();
                var idx = i+1;
                movieVO.title = $('#data_list > li:nth-child('+idx+') > div > a > img')[0].attribs['alt'];
                movieVO.href = $('#data_list > li:nth-child('+idx+') > div > a')[0].attribs['href'];
                movieVO.imgurl = $('#data_list > li:nth-child('+idx+') > div > a > img')[0].attribs['src'];
                MovieVOArr.push(movieVO);
            }
            return MovieVOArr;
        }
        public getMovieInfoVOArr(res:object):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            try{
                var len = $('.lhmain').length;
                for(var i:number = 0;i<len;i++){
                    var playway:string = $('.lhmain span')[i].children[0].data;
                    var lena = $('.lhmain li').length/len;
                    for(var j:number = 0;j<lena;j++){
                        var idx = j+1;
                        var obj = $('.lhmain li:nth-child('+idx+')>a')[i];
                        var movieVO:MovieVO = new MovieVO();
                        MovieVOArr.push(movieVO);
                        movieVO.title = obj.attribs['title'];
                        movieVO.href = obj.attribs['href'];
                        movieVO.playway = playway;
                    }
                }
            }catch (e) {

            }

            return MovieVOArr;
        }
        public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
            var playIndexArr:string[] = link.split('-');//
            var wayidx:number = parseInt(playIndexArr[1])-1;
            var playidx:number = parseInt(playIndexArr[2])-1;


                var content:string = res["body"];//.toString();
                var $ = res['$'];
                var data = $('#playbox script:nth-child(1)')[0].children[0].data;
                var urls = data.substring(data.lastIndexOf('(')+2,data.lastIndexOf(')')-1);
                var urlsunescape = unescape(urls);
                var allways = urlsunescape.split("$$");
                var plays = allways[wayidx].split("#");
                var playinfoarr = plays[playidx].split("$");


            var m11kInfo:MovieVO  =new MovieVO();
            m11kInfo.title = playinfoarr[0];
            var href = playinfoarr[1];
            if(m11kInfo.title==""){
                m11kInfo.title = playinfoarr[1];
                var href = playinfoarr[2];
            }
            if(href.indexOf('m3u8')==-1)
            {
                href= 'https://v.jump8.cn/play/tz/pc/?url='+href;
            }
            m11kInfo.playContent=this.getPlayContent(href,'1')

            return m11kInfo;
        }

    }
