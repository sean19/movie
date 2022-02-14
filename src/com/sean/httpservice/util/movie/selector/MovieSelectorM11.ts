import {SelectorBase} from "./SelectorBase";
import {MovieVO} from "../../VO/MovieVO";
import {UtillQueryData} from "../../../../crawler/utillHttp/UtillQueryData";
import {MovieConfigVO} from "../../VO/MovieConfigVO";

    export class MovieSelectorM11 extends SelectorBase{
        public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var $ = res["$"];
            var aa = "body  div:nth-child(1)  div  div.line-middle.margin-top  div.xl12.xs12.xm8.margin-top  div.tagbox  div  div.xl4.xs4.xm3.tagbox_pic.float-left.margin-top  a  ";
            var img = "body  div:nth-child(1)  div  div.line-middle.margin-top  div.xl12.xs12.xm8.margin-top  div.tagbox  div  div.xl4.xs4.xm3.tagbox_pic.float-left.margin-top  a  img";

            var len = $(aa).length;
            for(var i:number = 0;i<len;i++){
                var sr:MovieVO = new MovieVO();
                var pp = $(aa)[i]
                sr.title = pp["attribs"]["title"];
                sr.href= pp["attribs"]["href"];
                sr.imgurl = $(img)[i]["attribs"]["src"];

                MovieVOArr.push(sr);
            }
            return MovieVOArr;
        }
        public getMovieInfoVOArr(res:object):MovieVO[]{
            var MovieVOArr:MovieVO[] = [];
            var ps = "body  div:nth-child(1)  div  div  div.xl12.xs12.xm8.float-left  div.txtcon  div  div.margin-big-top.body_media  div  li"
            var $ = res["$"];
            var len = $(ps).length;

            for(var i:number = 0;i<len;i++){
                var sr:MovieVO = new MovieVO();
                sr.title = $(ps) [i].children[0]["attribs"].title;
                sr.href=  $(ps) [i].children[0]["attribs"]['href'];
                sr.playway ="m11";
                MovieVOArr.push(sr);
            }
            return MovieVOArr;
        }
        public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
            var m11kInfo:MovieVO  =new MovieVO();
            var $ = res["$"];
            var dd:string = $('script')[8].children[0].data
            var idx1:number = dd.indexOf("src=")+6;
            var idx2:number = dd.indexOf(".m3u8")+5;
            var src = dd.substring(idx1,idx2);
            var sr:MovieVO = new MovieVO();
            if(src && src !=""){
                m11kInfo.href =movieConfigVO.play_path+ src;
                m11kInfo.playContent = this.getPlayContent(m11kInfo.href);
            }
            return m11kInfo;
        }
    }
