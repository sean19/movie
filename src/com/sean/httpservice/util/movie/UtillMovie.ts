import {ConfigMgr} from "../../../ConfigMgr";
import {MovieConfigVO} from "../VO/MovieConfigVO";

export class UtillMovie {
    public static getTargetSearchURL(keyword:string,movieVO:MovieConfigVO,type:string):string{
        var targtUrl:string = movieVO.host;
        if(type=="1"){//搜索
            var urlencode = require('urlencode');
            var newkey:string = urlencode(keyword,movieVO.chartset);
            targtUrl = movieVO.host+movieVO.search_path.replace('<keyword>',newkey);
        }

        return targtUrl;
    }
    public static getTargetInfoURL(link:string,configVO:MovieConfigVO):string{
        var targtUrl:string = configVO.host+link;
        return targtUrl;
    }
    public static getTargetSeeURL(link:string,configVO:MovieConfigVO):string{
        var targtUrl:string = configVO.see_path+link;
        switch(configVO.id){
            case 4:
                var lk = link.substring(0,link.lastIndexOf('/'));
                lk = lk.substring(lk.lastIndexOf('/')+1,lk.length);
                targtUrl = configVO.see_js.replace('<idx>',lk);
                break;
            // case 5:
            //     var lk = link.substring(0,link.lastIndexOf('-')+1)+'1';
            //     targtUrl = configVO.see_js.replace('<idx>',lk);
            //     break;
            case 100:
                targtUrl = link;
                break;
        }

        return targtUrl;
    }
}