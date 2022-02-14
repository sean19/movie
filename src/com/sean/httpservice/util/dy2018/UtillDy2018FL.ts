import {UtillHttpPuppeteer} from "../../../crawler/utillHttp/UtillHttpPuppeteer";
import {UtilDY2018} from "./UtilDY2018";
import {UtillQueryData} from "../../../crawler/utillHttp/UtillQueryData";
import {UtillDY2018PageInfo} from "./UtillDY2018PageInfo";
import {UtillDY2018PageInfoFL} from "./UtillDY2018PageInfoFL";

/**
 * 获取分类的数据
 */
export class UtillDy2018FL {

    private mv_type:number=0;
    private page_get_index:number=1;
    private  page_total:number=100;

    private  page_item_num:number=30;


    public  async getData (mv_type:number){
        this.mv_type = mv_type;
        while(this.page_get_index <= this.page_total){
            await this.getPage();
        }
    }

    protected async getPage(){
        console.log("【2】正在获取:"+UtilDY2018.getFLName(this.mv_type)+"第"+this.page_get_index+"/"+this.page_total+"页");
        var arr_items:ItemInfo[] = [];
        var arr:ItemInfo[] =[];
        var retry_num:number = 50;
        while (arr.length==0 && --retry_num >=0){
            arr =await this.getPageItems(this.mv_type,this.page_get_index);
        }
        arr_items = arr_items.concat(arr);
        console.log("【2】获取到页面数据:"+UtilDY2018.getFLName(this.mv_type)+"第"+this.page_get_index+"/"+this.page_total+"页"+arr_items.length+"/"+this.page_item_num);
        for(var i:number = 0;i<arr_items.length;i++){
            await this.getPageInfo(arr_items[i]);
        }
        this.page_get_index ++;
    }

    protected  async  getPageItems(mv_type:number,page_index:number ):Promise<ItemInfo[]>{
        var url:string = UtilDY2018.url+'/'+mv_type+'/index'+(page_index==1?'':'_'+page_index)+'.html';
        var content:string =await  UtillHttpPuppeteer.gatUrlData(url);
        var mvs:ItemInfo[]=[];
        if(content==""){
            console.log("cannot open web!"+url)
        }else{
            var $ = UtillQueryData.getQueryData(content);

            var len = $('.bd3 .bd3r .co_area2 .co_content8 table').length;
            for(var i:number=1;i<=len;i++){
                mvs.push( this.getImteInfo($,mv_type,page_index,i));
            }
           this.page_total =  this.gettotalPage($('.co_area2 .x p').text());
        }
        return mvs;
    }
    private gettotalPage(str:string):number{
        var st:number = str.indexOf('/')+1;
        var ed:number = str.indexOf('每')-1
        var nm:number = Number(str.substring(st,ed));

        return nm?(nm>100?nm:100):100;
    }
    protected  getImteInfo($,mv_type,page_index,i):ItemInfo{
        var title = $('.bd3 .bd3r .co_area2 .co_content8 table:nth-child('+i+') a')[1].children[0].data
        var item = $('.bd3 .bd3r .co_area2 .co_content8 table:nth-child('+i+') a')[0].children[0].data
        var href = $('.bd3 .bd3r .co_area2 .co_content8 table:nth-child('+i+') a')[1].attribs['href'];
        return new ItemInfo(mv_type,page_index,title,item,UtilDY2018.url + href);
    }
    //=====获取详情页面的数据
    protected async getPageInfo(itemInfo:ItemInfo){
        var pageinfo:UtillDY2018PageInfoFL = new UtillDY2018PageInfoFL(itemInfo.mv_type+"",itemInfo.page_index+"");
       var arr:object[] =  await pageinfo.getPageInfo(itemInfo.title,itemInfo.href);

    }
}
class ItemInfo {
    public mv_type:number;
    public page_index:number;
    public title:string;
    public item:string;
    public href:string;
    constructor(mv_type:number,page_index:number,title:string,item:string,href:string){
        this.mv_type = mv_type;
        this.page_index = page_index;
        this.title = title;
        this.item = item;
        this.href = href;
    }
}