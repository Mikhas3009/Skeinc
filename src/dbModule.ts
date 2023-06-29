import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from './models/DB-sequelize-models/modelUser';
import { CompanyModel } from './models/DB-sequelize-models/modelCompany';
import { ConfigModule } from '@nestjs/config';
import { NewsModel } from './models/DB-sequelize-models/modelNews';
import { ProjectModel } from './models/DB-sequelize-models/modelProject';
import { TaskModel } from './models/DB-sequelize-models/modelTask';
import { FinanceModel } from './models/DB-sequelize-models/modelFinances';
import { TimeManagerModel } from './models/DB-sequelize-models/modelTimeManager';
import { TMFilterModel } from './models/DB-sequelize-models/modelFilter';
import { ChatModel } from './models/DB-sequelize-models/modelChat';

@Module({//Модуль базы данных
    imports:[
        ConfigModule.forRoot({}),
        SequelizeModule.forRoot({
            dialect : "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME, 
            synchronize: true,
            autoLoadModels: true,
            models:[
                UserModel,
                CompanyModel,
                NewsModel,
                ProjectModel,
                TaskModel,
                FinanceModel,
                TimeManagerModel,
                TMFilterModel,
                ChatModel
            ],
        }),
    ],
})
export class DBModule {}