import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from '../models/DB-sequelize-models/modelUser';
import { CompanyModel } from '../models/DB-sequelize-models/modelCompany';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from 'src/dbModule';
import { JwtModule } from '@nestjs/jwt';
import { IndexModule } from 'src/index/index.module';

@Module({//Модуль авторизации
    controllers: [AuthController],
    providers: [AuthService],
    imports:[
        IndexModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '60d'
            }
        }),
        DBModule,
        ConfigModule.forRoot({}),
        SequelizeModule.forFeature([UserModel,CompanyModel]),
    ],
    exports:[AuthService]
})
export class AuthModule {}