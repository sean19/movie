import {ConfigMgr} from "../../../ConfigMgr";
import {UtillHttpSuperagent} from "../../../crawler/utillHttp/UtillHttpSuperagent";
import {UtillQueryData} from "../../../crawler/utillHttp/UtillQueryData";

export class UtilGetFromASINCode {
     public static url:string="https://www.amazon.com/dp/";


     public static async getFromASINCode(asincode:string):Promise<string[]>{
          var url:string = UtilGetFromASINCode.url+ asincode;
          var content:string =await  UtillHttpSuperagent.gatUrlData(url);
          var dataStr:string[]=[];

          var startIndexOfInformation:number = content.indexOf('Product information');
          var strInfomation:string = content.substring(startIndexOfInformation,startIndexOfInformation+20000);
          var $ = await UtillQueryData.getQueryData(strInfomation);
          //todd********************************* not good enough coding\
          $('.item-model-number td').each(function(i,e){
               if(i==1){
                    dataStr[0]=$(e).text();
               }
          });
          $('#SalesRank td').each(function(i,e){
               if(i==1){
                    var reg = /\w+/;
                    var rank:string = $(e).text();
                    dataStr[1] = rank.substring(rank.indexOf('#'),rank.indexOf('('))
               }
          });

          $('.size-weight td').each(function(i,e){
               if(i==3){
                    dataStr[2]=$(e).text();
               }
          });
          return dataStr;
     }
}