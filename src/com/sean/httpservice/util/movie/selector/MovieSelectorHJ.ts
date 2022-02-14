import {SelectorBase} from "./SelectorBase";
import {MovieVO} from "../../VO/MovieVO";
import {UtillQueryData} from "../../../../crawler/utillHttp/UtillQueryData";
import {MovieConfigVO} from "../../VO/MovieConfigVO";

    export class MovieSelectorHJ extends SelectorBase{
        public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            var len = $('#left .list').length;
            for(var i:number = 0;i<len;i++){
                var movieVO:MovieVO = new MovieVO();
                var idx = i+1;
                movieVO.title = $('#left .list .title a')[i].attribs['title'];
                movieVO.href = $('#left .list .title a')[i].attribs['href'];
                movieVO.imgurl = $('#left img')[i].attribs['src'];
                MovieVOArr.push(movieVO);
            }
            return MovieVOArr;
        }
        public getMovieInfoVOArr(res:object):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            try{
                var len = $('#play_url').length;
                for(var i:number = 0;i<len;i++){
                    var lena = $('.play-list a').length/len;
                    for(var j:number = 0;j<lena;j++){
                        var movieVO:MovieVO = new MovieVO();
                        MovieVOArr.push(movieVO);
                        var idx = j+1;
                        movieVO.title = $('#play_url > ul > li:nth-child('+idx+') > a')[i].children[0].data;
                        var href:string = $('#play_url > ul > li:nth-child('+idx+') > a')[i].attribs['href'];
                        href = href.substring(0,href.lastIndexOf('-')+1) + '1.js?5dbd79b563302-'+href.substring(href.lastIndexOf('-')+1,href.indexOf('.html'));
                        movieVO.href = href;
                        movieVO.playway = $('#play_url > h2 > span:nth-child(1)')[i].children[0].data
                    }
                }
            }catch (e) {

            }

            return MovieVOArr;
        }
        public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
                var content:string = res["body"];//.toString();

            var m11kInfo:MovieVO  =new MovieVO();
            var playIndexArr:string[] = link.split('-');//.substring(link.lastIndexOf('/')+1,link.lastIndexOf('.html')).split('_');
            var os = content.substring(13,content.length-2);
            var jsobj = JSON.parse(os);
            var wayidx:number = parseInt(playIndexArr[2]);
            var playidx:number = parseInt(playIndexArr[4])-1;
            var wayobj = jsobj.Data[wayidx];
            var mvstrarr = wayobj.playurls[playidx];
            m11kInfo.title = mvstrarr[0];
            m11kInfo.playContent=this.getPlayContent('https://www.juji.tv/Runtime/Player/d.html?v='+(mvstrarr[1]),'1')
            return m11kInfo;
        }

    }
