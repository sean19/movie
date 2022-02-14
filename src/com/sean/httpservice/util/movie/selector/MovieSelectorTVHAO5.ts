import {SelectorBase} from "./SelectorBase";
import {MovieVO} from "../../VO/MovieVO";
import {MovieConfigVO} from "../../VO/MovieConfigVO";
import {UtillQueryData} from "../../../../crawler/utillHttp/UtillQueryData";

    export class MovieSelectorTVHAO5 extends SelectorBase{
        public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];

            return MovieVOArr;
        }
        public getMovieInfoVOArr(res:object):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            var len:number = $('.channel-link').length;
            for(var i:number=0;i<len;i++){
                var movieVO:MovieVO = new MovieVO();
                movieVO.href = $('.channel-link')[i].attribs['href'];
                movieVO.title = $('.channel-link')[i].children[0].data;
                movieVO.playway = "直播";
                MovieVOArr.push(movieVO);
            }
            return MovieVOArr;
        }
        //**------------------------------------------
        //**------------------------------------------
        public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
            var m11kInfo:MovieVO  =new MovieVO();
            var tt:string="";
            try{
                var $ = res["$"];
                if(!$)return null;
                if($('iframe').length >0){
                    m11kInfo.href = $('iframe')[0].attribs['src'];
                    m11kInfo.playContent=this.getPlayContent(m11kInfo.href,'1')
                }else if($('video').length >0){
                    m11kInfo.href = $('video')[0].attribs['src'];
                    m11kInfo.playContent=this.getPlayContent(m11kInfo.href,'2')
                }

            }catch (e) {

            }
            return m11kInfo;
        }
        //**------------------------------------------
        //**------------------------------------------

    }

