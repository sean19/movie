import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_asni" } )
export class SysModifyLog extends Model<SysModifyLog>
{

   

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    userName:string;

    @Column
    userId:string;

    @Column
    action:string;

    @Column
    tableName:string;

    @Column
    itemId:number;

    @Column
    create_time:Date;
}