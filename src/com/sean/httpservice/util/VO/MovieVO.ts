import {TMovieSee} from "../../../sqlTable/TMovieSee";

export class MovieVO {
    public platform:string ;
    public playway:string;
    public rel:string;//??
    public target:string;
    public info:string;
    public title:string;
    public titleInfo:string;
    public href:string;
    public urlList:string;
    public imgurl:string;
    public playContent:string;

    public static ii:number=0;
    public async saveInfo(){
        console.log("=======+6ii"+(MovieVO.ii++));
        var tms:TMovieSee = await TMovieSee.findOne({where:{href:this.href}});
        if(tms==null){
            tms=new TMovieSee();
        }
        tms.href = this.href;
        tms.title = this.title;
        tms.titleInfo = this.titleInfo;
        tms.platform = this.platform;
        tms.rel = this.rel;
        tms.target = this.target;
        tms.info = this.info;
        tms.urlList = this.urlList;
        tms.imgurl = this.imgurl;
        tms.playContent = this.playContent;
        await tms.save().catch(error => {
            // console.log("*************"+error.toString())
        });
    }
}