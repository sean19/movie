import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_TT_see_record" } )
export class RecordSee extends Model<RecordSee>
{


    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
      ip:string;
    @Column
    keyword:string;
    @Column
      type:string;

    @Column
    cr_time:Date;
    @Column
    up_time:Date;

    public static async checkRecord(type:string,keywd:string,ip:string):Promise<void>
    {
        keywd=keywd.replace(';','');
        keywd=keywd.replace(',','');

        var rc:RecordSee = await RecordSee.findOne({where:{ip:ip,type:type}});
        if(rc){
            rc.keyword = RecordSee.addKeyWord(rc.keyword,keywd);
            rc.up_time = new Date();
        }else{
            rc = new RecordSee();
            rc.cr_time=rc.up_time=new Date();
            rc.ip=ip;
            rc.keyword=keywd+","+1;
            rc.type = type;

        }
        await rc.save();
    }
    protected static addKeyWord(keys:string,keyword:string):string{
        var newkeys:string = "";
        var arrkeys:string[] = keys.split(';');
        arrkeys = RecordSee.updateKeywords(arrkeys,keyword);
        if(arrkeys.length>50)arrkeys.shift();
        for(var i:number=0;i<arrkeys.length;i++){
            newkeys+=(i==0?"":';')+arrkeys[i];
        }
        newkeys = (newkeys.length>1000?newkeys.substring(newkeys.length-100,newkeys.length):newkeys);
        return newkeys;
    }
    protected static updateKeywords(arrkeys:string[],keyword:string):string[]{
        var isnew:boolean = true;
        for(var i:number=0;i<arrkeys.length;i++){
            var strarr:string[] = arrkeys[i].split(',');
            if(strarr[0]==keyword){
                var num:number = parseInt(strarr[1])+1;
                arrkeys[i]=keyword+','+num;
                isnew = false;
            }
        }
        if(isnew){
            arrkeys.push(keyword+','+1);
        }
        return arrkeys;

    }
}