import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_TT_FL" } )
export class TTFL extends Model<TTFL>
{

 

    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    mv_FL:string;
    @Column
    mv_pageIndex:string;
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
    from_link:string;



    @Column
    cr_time:Date;
    @Column
    ud_time:Date;
}