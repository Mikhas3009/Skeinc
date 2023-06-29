import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./modelUser";
import { CompanyModel } from "./modelCompany";
import { TaskModel } from "./modelTask";

@Table({tableName:"time-manager",createdAt:false,updatedAt:false})
export class TimeManagerModel extends Model<TimeManagerModel>{
    
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    time_manager_id:number;
    
    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER})
    user_id:number;

    @ForeignKey(()=>CompanyModel)
    @Column({type: DataType.INTEGER})
    company_id:number;

    @Column({type:DataType.DATEONLY,allowNull:false})
    time_manager_date:string;

    @Column({type:DataType.TIME})
    time_manager_time:string;

    @Column({type:DataType.STRING})
    time_manager_title:string;

    @ForeignKey(()=>TaskModel)
    @Column({type:DataType.INTEGER,allowNull:true})
    task_id:string;

}