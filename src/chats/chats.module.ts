import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { PersonalCabinetModule } from 'src/personal-cabinet/personal-cabinet.module';
import { ChatGateway } from './chats-gateway';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModel } from 'src/models/DB-sequelize-models/modelChat';

@Module({
    imports:[
        PersonalCabinetModule,
        AuthModule,
        SequelizeModule.forFeature([
            ChatModel
        ])
    ],
    controllers: [ChatsController],
    providers: [ChatsService,ChatGateway]
})
export class ChatsModule {}
