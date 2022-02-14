import { AllowNull, Column, Length, Model, Table } from "sequelize-typescript";



@Table({ tableName: "t_config_selector" })
export class TConfigSelector extends Model<TConfigSelector>
{

   

    @Length({ min: 1, max: 11, msg: 'wrong length' })
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    info: string;
    @Column
    url: string;
    @Column
    datatype: string;
    @Column
    selector: string;
    @Column
    attribs: string;


    @Column
    createdAt: Date;
    @Column
    updatedAt: Date;
    public getattribsarr(): any {
        return JSON.parse(this.attribs);
    }
}