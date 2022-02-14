export  class UtlHttp {
    public static  getInfo(info:string,key:string):string
    {
        var infoarr:string[] = info.split('&');
        for(var i:number = 0 ; i <infoarr.length;i++)
        {
            var param:string[] = infoarr[i].split("=");
            var idx = infoarr[i].indexOf('=');
            if(param[0]==key)
            {
                return infoarr[i].substr(idx+1,infoarr[i].length)
            }
        }
        return "";
    }
    public static  getNumber(info:string,key:string,df:number=0):number
    {
        var infoarr:string[] = info.split('&');
        for(var i:number = 0 ; i <infoarr.length;i++)
        {
            var param:string[] = infoarr[i].split("=");
            if(param[0]==key)
            {
                if(param[1]=="")
                {
                    return df;

                }else
                {
                    return Number.parseFloat(param[1]);

                }
            }
        }
        return df;
    }
    public static  getDate(info:string,key:string):Date
    {
        var date:Date =new Date();
        var infoarr:string[] = info.split('&');
        for(var i:number = 0 ; i <infoarr.length;i++)
        {
            var param:string[] = infoarr[i].split("=");
            if(param[0]==key)
            {
                if(param[1]!="")
                {
                    return new Date(param[1]);

                }
            }
        }
        return date;
    }

    public static getObjectFromUrlString(urlString:string):any {
        var obj={};
        var infoarr: string[] = urlString.split('&');
        for (var i: number = 0; i < infoarr.length; i++) {
            var param: string[] = infoarr[i].split("=");
            var key:string = param[0];
            var value:string = param[1];
            if(key !="xml" && key != "tableName" && value != "")
            {
                eval("obj." + key + "='" + value + "'");
            }
        }
        return obj;
    }

}