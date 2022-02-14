import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_config_book" } )
export class TConfigBook extends Model<TConfigBook>
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
    searchpage:string;
    @Column
    chapterpage:string;
    @Column
    chapterselect:string;
    @Column
    infotitle:string;
    @Column
    infooption1:string;
    @Column
    infooption2:string;
    @Column
    infotext:string;
    @Column
    createdAt:Date;
    @Column
    updatedAt:Date;
}