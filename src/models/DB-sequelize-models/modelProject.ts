import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CompanyModel } from "./modelCompany";
import { TaskModel } from "./modelTask";
import { Col } from "sequelize/types/utils";

@Table({tableName: "projects", createdAt: false, updatedAt: false })
export class ProjectModel extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    project_id: number;

    @Column({type: DataType.STRING,allowNull: false})
    project_name: string;

    @Column({type: DataType.STRING,allowNull: false})
    project_description: string;

    @Column({type: DataType.STRING,allowNull: false})
    project_date: string;

    @Column({type:DataType.STRING,allowNull: true})
    project_status: string;

    @ForeignKey(()=>CompanyModel)
    @Column({type: DataType.INTEGER,allowNull: false})
    company_id:number;

    @HasMany(()=>TaskModel)
    projectTasks:TaskModel[];
}