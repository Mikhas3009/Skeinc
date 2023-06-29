import { Model ,Table,Column,DataType, ForeignKey, HasMany} from "sequelize-typescript";
import { CompanyModel } from "./modelCompany";
import { TaskModel } from "./modelTask";
import { TimeManagerModel } from "./modelTimeManager";
import { ChatModel } from "./modelChat";

@Table({tableName: "users", createdAt: false, updatedAt: false })
export class UserModel extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    id:number;

    @Column({type: DataType.STRING,unique: false,allowNull: false})
    fio:string;
    @Column({type: DataType.STRING,unique: true,allowNull: false})
    email:string;

    @Column({type: DataType.STRING,unique: false,allowNull: false})
    phone:string;

    @Column({type: DataType.STRING,unique: true,allowNull: false})
    login:string;

    @Column({type: DataType.STRING,unique: false,allowNull: false})
    password:string;

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    company:string;

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    role:string;

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    address:string;  

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    card:string;  

    @Column({type: DataType.INTEGER,unique: false,allowNull: true})
    salary:number; 

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    post:string; 

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    avatar:string

    @ForeignKey(()=>CompanyModel)
    @Column({type: DataType.INTEGER})
    company_id:number;

    @HasMany(() => TaskModel)
    userTasks: TaskModel[];

    @HasMany(() => TimeManagerModel)
    userTimeManager: TimeManagerModel[];

    @HasMany(()=>ChatModel)
    userChat:ChatModel[];

}