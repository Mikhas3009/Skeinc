import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./modelUser";
import { CompanyModel } from "./modelCompany";
import { ProjectModel } from "./modelProject";

@Table({tableName: "tasks", createdAt: false, updatedAt: false })
export class TaskModel extends Model{

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    task_id:number;

    @Column({type: DataType.STRING, allowNull: false})
    task_name:string;

    @Column({type: DataType.STRING, allowNull: false})
    task_description:string;

    @Column({type: DataType.STRING, allowNull: false})
    task_date:string;

    @Column({type: DataType.STRING, allowNull: false})
    task_priority:string;

    @Column({type: DataType.STRING, allowNull: false})
    task_status:string;

    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id:number

    @ForeignKey(()=>CompanyModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    company_id:number

    @ForeignKey(()=>ProjectModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    project_id:number

    @BelongsTo(() => UserModel)
    userTasks: UserModel[];

    @BelongsTo(() => ProjectModel)
    projectTasks: ProjectModel[];

}