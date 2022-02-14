import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_movie_tj" } )
export class TMovieTJ extends Model<TMovieTJ>
{

  

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    title:string;

    @Column
    platform:string;


    @Column
    movieurl:string;
    @Column
    movieOrgurl:string;
    @Column
    tjm:string;

}