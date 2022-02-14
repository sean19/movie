import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_TT_main" } )
export class TTMain extends Model<TTMain>
{

 

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
      mv_name:string;
    @Column
      mv_name_1:string;
    @Column
      mv_year:string;
    @Column
      mv_area:string;
    @Column
      mv_type:string;
    @Column
      mv_lan:string;
    @Column
      mv_imdb:string;

    @Column
    title:string;

    @Column
    title_sub:string;

    @Column
    href:string;


    @Column
    create_time:Date;
    @Column
    update_time:Date;
}