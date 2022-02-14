import {SelectorBase} from "./SelectorBase";
import {MovieVO} from "../../VO/MovieVO";
import {UtillQueryData} from "../../../../crawler/utillHttp/UtillQueryData";
import {MovieConfigVO} from "../../VO/MovieConfigVO";

    export class MovieSelectorLL extends SelectorBase{
        public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            var len = $('#contents > li').length;
            for(var i:number = 0;i<len;i++){
                var movieVO:MovieVO = new MovieVO();
                var idx = i+1;
                movieVO.title = $('#contents > li:nth-child('+idx+') > a').children()[0].attribs['alt'];
                movieVO.href = $('#contents > li:nth-child('+idx+') > a')[0].attribs['href'];
                movieVO.imgurl = this.getImglink($('#contents > li:nth-child('+idx+') > a').children()[0].attribs['src'],movieConfigVO);
                MovieVOArr.push(movieVO);
            }
            return MovieVOArr;
        }
        public getMovieInfoVOArr(res:object):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            var len = $('#dlist0 > li').length;
            for(var i:number = 0;i<len;i++){
                var movieVO:MovieVO = new MovieVO();
                var idx = i+1;
                movieVO.href = $("#dlist0 > li:nth-child("+idx+") > a")[0].attribs['href'];
                movieVO.title = $("#dlist0 > li:nth-child("+idx+") > a")[0].children[0].data;
                movieVO.playway="乐乐";
                MovieVOArr.push(movieVO);
            }

            return MovieVOArr;
        }
        public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
            var content:string = res["body"];//.toString();
            var m11kInfo:MovieVO  =new MovieVO();
            var playIndexArr:string[] = link.substring(link.lastIndexOf('/')+1,link.lastIndexOf('.html')).split('_');
            var os = content.substring(11,content.length-1);
            var jsobj = JSON.parse(os);
            var wayobj = jsobj[parseInt(playIndexArr[0])];
            var mvstrarr = wayobj.movie[parseInt(playIndexArr[1])];
            m11kInfo.title = mvstrarr[0];
            var src:string = decodeURIComponent(mvstrarr[1]);
            var ty:string = ((src.indexOf(".mp4")==-1)?"1":"2");
            m11kInfo.playContent=this.getPlayContent(src,ty)
            return m11kInfo;
        }

    }
