import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';
import { PersonalCabinetModule } from './personal-cabinet/personal-cabinet.module';
import { APP_FILTER} from "@nestjs/core";
import { NotFoundExceptionFilter } from "./httpExceptions/notFound";
import { NewsModule } from './news/news.module';
import { ProjectsTasksModule } from './projects-tasks/projects-tasks.module';
import { FinancesModule } from './finances/finances.module';
import { TimeManagerModule } from "./time-manager/time-manager.module";
import { ForbiddenExceptionFilter } from "./httpExceptions/ForbiddenException";
import { AnalitycsModule } from './analytics/analytics.module';
import { ChatsModule } from './chats/chats.module';

@Module({ //Корневой модуль приложения
    imports: [
        AuthModule, 
        IndexModule,
        PersonalCabinetModule,
        NewsModule,
        FinancesModule,
        TimeManagerModule,
        AnalitycsModule,
        ChatsModule,
        ProjectsTasksModule,
    ],
    providers:[
        {provide: 
            APP_FILTER, 
            useClass: NotFoundExceptionFilter,
        },
        {provide: 
            APP_FILTER, 
            useClass: ForbiddenExceptionFilter,
        },
    ]
})
export class AppModule {}