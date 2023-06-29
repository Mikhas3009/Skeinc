// Импорты
import { Module } from '@nestjs/common';
import { PersonalCabinetController } from './personal-cabinet.controller';
import { PersonalCabinetService } from './personal-cabinet.service';
import { DBModule } from 'src/dbModule';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/DB-sequelize-models/modelUser';
import { CompanyModel } from 'src/models/DB-sequelize-models/modelCompany';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskModel } from 'src/models/DB-sequelize-models/modelTask';
import { ProjectsTasksModule } from 'src/projects-tasks/projects-tasks.module';
import { CompanyFilterService } from './company-filter.service';
import { TMFilterModel } from 'src/models/DB-sequelize-models/modelFilter';
// Модуль личного кабинета
@Module({
    imports:[
        MulterModule.register({
            dest:'./uploads'
        }),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '60d'
            }
        }),
        SequelizeModule.forFeature([
            UserModel,
            CompanyModel,
            TaskModel,
            TMFilterModel,
        ]),
        AuthModule,
        DBModule,
        ProjectsTasksModule,
    ],
    controllers: [PersonalCabinetController],
    providers: [PersonalCabinetService,CompanyFilterService],
    exports:[PersonalCabinetService]
})
export class PersonalCabinetModule {}