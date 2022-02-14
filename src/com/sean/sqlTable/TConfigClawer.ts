import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_config_clawer" } )
export class TConfigClawer extends Model<TConfigClawer>
{

 

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    userAgent:string;

    @Column
    maxConnections:number;
    @Column
    retries:number;
    @Column
    retryTimeout:number;
    @Column
    createdAt:Date;
    @Column
    updatedAt:Date;
}