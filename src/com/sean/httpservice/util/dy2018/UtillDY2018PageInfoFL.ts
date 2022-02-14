import {UtilDY2018} from "./UtilDY2018";
import {UtillHttpPuppeteer} from "../../../crawler/utillHttp/UtillHttpPuppeteer";
import {UtillQueryData} from "../../../crawler/utillHttp/UtillQueryData";
import {TTMain} from "../../../sqlTable/TTMain";
import {MovieInfo, UtillDY2018PageInfo} from "./UtillDY2018PageInfo";
import {TTFL} from "../../../sqlTable/TTFL";

export class UtillDY2018PageInfoFL extends UtillDY2018PageInfo{
    private mv_FL:string;
    private mv_pageIndex:string;

    constructor(mv_FL:string,pageIndex:string){
        super();
        this.mv_FL = mv_FL;
        this.mv_pageIndex = pageIndex;

    }
    public  async getPageInfo(title:string, url:string,refresh:boolean = false):Promise<object[]>{
        var objects:object[] = [];
        var flinfo:TTFL[] = await TTFL.findAll({where:{from_link:url}});
        if(flinfo.length>0 && refresh == false){
            console.log("已经查过数据了："+url)
        }else{
            return super.getPageInfo(title,url);
        }
        return objects;
    }
    //更新数据库条目===================
    protected  async updateDB(mvinfo:MovieInfo,obj:object):Promise<void>{
        var title:string = obj['title'];
        var title_sub:string = obj['title_sub'];

        var tt:TTFL = await TTFL.findOne({where: {
                title: title, title_sub: title_sub}
        });
        if(tt){
            tt.ud_time = new Date();
            console.log("【3】更新数据："+this.link);
        }else{
            tt = new  TTFL;
            tt.cr_time =tt.ud_time = new Date();
            console.log("【3】新建数据："+this.link);
        }
        tt.from_link = this.link;
        tt.mv_FL = UtilDY2018.getFLName(Number(this.mv_FL)) ;
        tt.mv_pageIndex = this.mv_pageIndex;
        tt.title = title;
        tt.title_sub=title_sub;
        tt.mv_name = mvinfo.mv_name;
        tt.mv_name_1 = mvinfo.mv_name_1;
        tt.mv_area = mvinfo.mv_area;
        tt.mv_imdb = mvinfo.mv_imdb;
        tt.mv_lan = mvinfo.mv_lan;
        tt.mv_type = mvinfo.mv_type;
        tt.href = obj['href'];

        await tt.save();

    }
}
