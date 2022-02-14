import {MovieVO} from "../../VO/MovieVO";
import {MovieConfigVO} from "../../VO/MovieConfigVO";
import {ConfigMgr} from "../../../../ConfigMgr";
import {MovieClawer} from "../MovieClawer";

export class MovieData {
    protected movie_info:MovieVO;
    protected play_info:MovieVO[];

    constructor(md:MovieVO){
        this.movie_info = md;
    }
    public dispose():void{

    }
    public async startLoad(){
        await this.loadInfo();
    }
    public async loadInfo(){
        var cvo:MovieConfigVO = ConfigMgr.instance.getConfig("movie_"+this.movie_info.platform);
        if(cvo) {
            var sc: MovieClawer = new MovieClawer();
            var arrinfo: MovieVO[] = await sc.getInfoMovieVOS(this.movie_info.href, cvo);
            var arrsee: MovieVO[] =[];
            var infolist:string="";
            for (var i:number=0;i<arrinfo.length;i++){
                var mif:MovieVO = arrinfo[i];
                var seevo:MovieVO = await sc.getSeeMovieVO(mif.href,cvo);
                seevo.titleInfo =mif.title;
                arrsee.push(seevo);
                infolist+=mif.href+";";
            }
            arrsee.forEach(svo=>{
                svo.platform = this.movie_info.platform;
                svo.info = this.movie_info.info;
                svo.imgurl = this.movie_info.imgurl;
                svo.title = this.movie_info.title;
                svo.urlList = infolist;
                svo.saveInfo();
            })

        }
    }
}