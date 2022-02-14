import {MovieVO} from "../../VO/MovieVO";
import {MovieConfigVO} from "../../VO/MovieConfigVO";


export class SelectorBase {
    public getMovieSearchVOArr(res:object,movieConfigVO:MovieConfigVO):MovieVO[]{
        return [];
    }
    public getMovieInfoVOArr(res:object):MovieVO[]{
        return [];
    }
    public async getMovieSeeVO(link:string,res:object,movieConfigVO:MovieConfigVO):Promise<MovieVO>{
        return null;
    }

    /**
     *
     * @param href
     * @param ty 1 - iframe 2-video
     */
    protected getPlayContent(href:string,ty:string = '1'):string{
        if(ty == "2"){
            return"<video controls autoplay ><source src='"+href+"' autoplay='autoplay'></video>"
        }else{
            return "<iframe id = 'frameSee'  frameborder='0' onload='loadFrame()' src='"+href+"?rel=0&amp;autoplay=1"+"' style='width:100%;height:100%' allowfullscreen=''true' ></iframe>";
        }
    }
    protected getImglink(link:string,movieConfigVO:MovieConfigVO):string{
        if(link.indexOf('/')==0){
            link = movieConfigVO.host+link;
        }
        return link;
    }
}
