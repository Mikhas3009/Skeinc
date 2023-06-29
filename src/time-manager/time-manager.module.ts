import { Module } from '@nestjs/common';
import { TimeManagerController } from './time-manager.controller';
import { TimeManagerService } from './time-manager.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimeManagerModel } from 'src/models/DB-sequelize-models/modelTimeManager';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsTasksModule } from 'src/projects-tasks/projects-tasks.module';
import { TaskModel } from 'src/models/DB-sequelize-models/modelTask';

@Module({
    imports:[
        AuthModule,
        ProjectsTasksModule,
        SequelizeModule.forFeature([
            TimeManagerModel,
            TaskModel,
        ])

    ],
    controllers: [TimeManagerController],
    providers: [TimeManagerService]
})
export class TimeManagerModule {}
