import { Module } from '@nestjs/common';
import { ProjectsTasksService } from './projects-tasks.service';
import { ProjectsTasksController } from './projects-tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModel } from 'src/models/DB-sequelize-models/modelTask';
import { ProjectModel } from 'src/models/DB-sequelize-models/modelProject';
import { UserModel } from 'src/models/DB-sequelize-models/modelUser';
import { AuthModule } from 'src/auth/auth.module';
import { PersonalCabinetModule } from 'src/personal-cabinet/personal-cabinet.module';

@Module({
    imports:[
        SequelizeModule.forFeature([TaskModel,ProjectModel,UserModel]),
        AuthModule,
    ],
    providers: [ProjectsTasksService],
    controllers: [ProjectsTasksController],
    exports:[ProjectsTasksService]
})
export class ProjectsTasksModule {}