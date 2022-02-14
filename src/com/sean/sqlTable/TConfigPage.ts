import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table( { tableName:"t_config_page" } )
export class TConfigPage extends Model<TConfigPage>
{


    @Length( { min:1, max:11, msg:'wrong length' } )
    @Column({primaryKey:true,autoIncrement:true})
    id:number;

    @Column
    description:string;
    @Column
    json:string;
    @Column
    platform:string;
    @Column
    model:string;

    @Column
    create_time:Date;
    @Column
    update_time:Date;
}