import {UtillHttpSuperagent} from "../../../crawler/utillHttp/UtillHttpSuperagent";
import {UtillHttpPuppeteer} from "../../../crawler/utillHttp/UtillHttpPuppeteer";
import {UtillQueryData} from "../../../crawler/utillHttp/UtillQueryData";
import {TTMain} from "../../../sqlTable/TTMain";
import {UtillDY2018PageInfo} from "./UtillDY2018PageInfo";

export class UtilDY2018 {
    private static name_fl:string[]=["剧情片","喜剧片","动作片","爱情片","科幻片","恐怖片","动画片","惊悚片","战争片","犯罪片"];
    public static idx_fl:number[]=[0,1,2,3,4,8,5,7,14,15];

    public static getFLName(flindex:number):string{
        return UtilDY2018.name_fl[flindex];
    }
    public static url:string="https://www.dy2018.com";
    // public static url:string="http://www.baidu.com";
    public static async getDy2018Main():Promise<string>{
        // var content:string =await  UtillHttpSuperagent.gatUrlData(UtilDY2018.url);
        var content:string = "";
        var retyrn_num:number=5;

        while(content=="" && --retyrn_num>=0){
            content = await  UtillHttpPuppeteer.gatUrlData(UtilDY2018.url);
            if(content==""){
                console.log("cannot open web!")
            }else{
                var $ = UtillQueryData.getQueryData(content);
                var mvs:object[]=[];
                var ass = $('.co_content222 ul li a');
                for(var i:number=0;i<ass.length;i++){
                    var aa = ass[i];
                    var url:string = UtilDY2018.url + aa.attribs['href'];
                    var pginfo:UtillDY2018PageInfo = new UtillDY2018PageInfo();
                    var objs:object[]= await pginfo.getPageInfo(aa.attribs['title'],url)
                    mvs.push(objs);
                }
            }
        }

        return content;
    }






}
