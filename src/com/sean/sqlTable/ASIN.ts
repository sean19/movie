import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_asin" } )
export class ASIN extends Model<ASIN>
{

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    ASNICode:string;

    @Column
    ASNIModel:string;
    @Column
    SalsesRank:string;
    @Column
    Dimensions:string;

    @Column
    create_time:Date;
    @Column
    update_time:Date;
}