import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CompanyModel } from "./modelCompany";

@Table({tableName:"time-manager-filter",createdAt:false,updatedAt:false})
export class TMFilterModel extends Model<TMFilterModel>{
    
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    filter_id:number;

    @ForeignKey(()=>CompanyModel)
    @Column ({type: DataType.INTEGER})
    company_id:number;

    @Column({type:DataType.STRING})
    filter_name:string;

    @BelongsTo(()=>CompanyModel)
    companyTimeManager: CompanyModel;
}