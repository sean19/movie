import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_movie_see" } )
export class TMovieSee extends Model<TMovieSee>
{

   

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    title:string;
    @Column
    titleInfo:string;
    @Column
    platform:string;
    @Column
    rel:string;
    @Column
    target:string;
    @Column
    info:string;
    @Column
    urlList:string;
    @Column
    imgurl:string;

    @Column
    playContent:string;
    @Column
    href:string;

}