import { Model,Column, DataType, ForeignKey, Table, BelongsTo } from "sequelize-typescript";
import { CompanyModel } from "./modelCompany";

@Table({tableName: "news", createdAt: false, updatedAt: false })
export class NewsModel extends Model{

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    news_id:number;

    @Column({type: DataType.STRING,unique :false})
    news_name:string;

    @Column({type: DataType.STRING, unique :false})
    news_description:string;

    @Column({type: DataType.STRING, unique :false})
    news_date:string;

    @BelongsTo(() => CompanyModel)
    company: CompanyModel;

    @ForeignKey(()=>CompanyModel)
    @Column({type: DataType.INTEGER,allowNull: false})
    company_id:number;

}