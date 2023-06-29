import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { DBModule } from 'src/dbModule';
import { NewsModel } from 'src/models/DB-sequelize-models/modelNews';
import { AuthModule } from 'src/auth/auth.module';
import { PersonalCabinetModule } from 'src/personal-cabinet/personal-cabinet.module';

@Module({
  imports:[
    DBModule,
    AuthModule,
    PersonalCabinetModule,
    SequelizeModule.forFeature([NewsModel])
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
