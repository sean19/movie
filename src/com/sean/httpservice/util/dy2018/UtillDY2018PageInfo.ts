import {UtilDY2018} from "./UtilDY2018";
import {UtillHttpPuppeteer} from "../../../crawler/utillHttp/UtillHttpPuppeteer";
import {UtillQueryData} from "../../../crawler/utillHttp/UtillQueryData";
import {TTMain} from "../../../sqlTable/TTMain";

export class UtillDY2018PageInfo {
    protected link:string = "";
//获取详情页面内容===================
    public  async getPageInfo(title:string, url:string):Promise<object[]>{
        this.link=url;
        var objs:object[] = [];
        // console.log(title,"********");
        // var content:string =await  UtillHttpSuperagent.gatUrlData(url);
        var retry_num:number = 50;
        while (objs.length == 0 && --retry_num>0){
            var content:string =await  UtillHttpPuppeteer.gatUrlData(url);
            if(content!=""){
                var $ = UtillQueryData.getQueryData(content);
                var textinfo:string[] = $("#Zoom").text().split("◎");
                var mvinfo:MovieInfo = new MovieInfo(textinfo);
                var lks = $("table tbody tr td a ");
                var movieInfos:MovieInfo[] = this.getMovieInfo(mvinfo,title,lks);
                objs=objs.concat(movieInfos);
            }else{
            }
        }
        if(objs.length==0){
            console.log(url,'get no data')
        }

        return objs;
    }
    //获取详连接列表===================
    private  getMovieInfo(mvinfo:MovieInfo,title:string,lks:any):MovieInfo[]{
        var objs:MovieInfo[] = [];
        for(var i:number=0;i<lks.length;i++){
            var lk = lks[i];
            var href:string = lk.attribs['href'];
            if(href.indexOf(".html")==-1 && href !="#"){
                var obj:object = {title:title};
                obj['title'] = title;
                obj['title_sub'] = lk.children[0].data;
                obj['href']=  href
                this.updateDB(mvinfo,obj);
                objs.push(mvinfo);
            }
        }
        return objs;
    }
    //更新数据库条目===================
    protected  async updateDB(mvinfo:MovieInfo,obj:object):Promise<void>{
        var title:string = obj['title'];
        var title_sub:string = obj['title_sub'];

        var tt:TTMain = await TTMain.findOne({where: {
                title: title, title_sub: title_sub}
        });
        if(tt){
            tt.update_time = new Date();
        }else{
            tt = new  TTMain;
            tt.create_time =tt.update_time = new Date();
        }
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
export class MovieInfo {
    public  mv_name:string="";
    public  mv_name_1:string="";
    public  mv_year:string="";
    public  mv_area:string="";
    public  mv_type:string="";
    public  mv_lan:string="";
    public  mv_imdb:string="";
    public constructor (strarr:string[]){
        this.mv_name= this.getinfo(strarr[2]);
        this.mv_name_1= this.getinfo(strarr[1]);
        this.mv_year= this.getinfo(strarr[3]);
        this.mv_area= this.getinfo(strarr[4]);
        this.mv_type= this.getinfo(strarr[5]);
        this.mv_lan= this.getinfo(strarr[6]);
        this.mv_imdb= this.getinfo(strarr[9]);

    }
    protected getinfo(str:string):string{
        if(str){

        return str.substring(str.lastIndexOf("　")+1,str.length);
        }
        return  "";
    }
}