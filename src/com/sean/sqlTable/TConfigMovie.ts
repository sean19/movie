import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_config_movie" } )
export class TConfigMovie extends Model<TConfigMovie>
{

   

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    platformid:string;

    @Column
    pname:string;
    @Column
    host:string;
    @Column
    searchstr:string;
    @Column
    searchinfo:string; 
    @Column
    playlist:string; 

    @Column
    create_time:Date;
    @Column
    update_time:Date;
}