import { Model ,Table,Column,DataType, HasMany} from "sequelize-typescript";
import { NewsModel } from "./modelNews";
import { UserModel } from "./modelUser";
import { ProjectModel } from "./modelProject";
import { FinanceModel } from "./modelFinances";
import { TimeManagerModel } from "./modelTimeManager";
import { TMFilterModel } from "./modelFilter";

@Table({tableName: "companies", createdAt: false, updatedAt: false })
export class CompanyModel extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    id:number;

    @Column({type: DataType.STRING,unique: false})
    company_name:string;

    @Column({type: DataType.STRING,unique: false})
    company_address:string;

    @Column({type: DataType.STRING,unique: false})
    company_email:string;

    @Column({type: DataType.STRING,unique: false})
    company_phone:string;
    
    @Column({type: DataType.STRING,unique: true})
    code:string;

    @HasMany(() => NewsModel)
    companyNews: NewsModel[];

    @HasMany(() => UserModel)
    companyUsers: UserModel[];

    @HasMany(() => ProjectModel)
    companyProject: UserModel[];

    @HasMany(() => ProjectModel)
    companyTasks: UserModel[];

    @HasMany(() => FinanceModel)
    companyFinances: FinanceModel[];

    @HasMany(() => TMFilterModel)
    companyFilters: TMFilterModel[];

    @HasMany(() => TimeManagerModel)
    companyTimeManager: TimeManagerModel[];
}