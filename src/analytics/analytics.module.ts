import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AuthModule } from 'src/auth/auth.module';
import { FinancesModule } from 'src/finances/finances.module';
import { PersonalCabinetModule } from 'src/personal-cabinet/personal-cabinet.module';
import { ProjectsTasksModule } from 'src/projects-tasks/projects-tasks.module';


@Module({
    imports:[
        AuthModule,
        FinancesModule,
        PersonalCabinetModule,
        ProjectsTasksModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService]
})
export class AnalitycsModule {}
