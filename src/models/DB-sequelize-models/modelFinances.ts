import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CompanyModel } from "./modelCompany";

@Table({tableName: "finance", createdAt: false, updatedAt: false })
export class FinanceModel extends Model{

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    finance_id:number

    @Column({type: DataType.STRING,allowNull: false})
    finance_status:string

    @Column({type: DataType.INTEGER,allowNull: false})
    finance_cost:number

    @Column({type: DataType.STRING,allowNull: false})
    finance_name:string

    @Column({type: DataType.DATEONLY,allowNull: false})
    finance_date:string

    @ForeignKey(()=>CompanyModel)
    @Column({type: DataType.INTEGER,allowNull: false})
    company_id:number;

}