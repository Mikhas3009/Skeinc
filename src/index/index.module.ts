import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports:[//Модуль главной страницы
        MailerModule.forRoot({
            transport:{
                host: 'smtp.mail.ru'||process.env.MAIL_HOST,
                port: 465||Number(process.env.MAIL_PORT),
                secure: true,
                auth: {
                    user: process.env.MAIL_ADDRESS,
                    pass: process.env.MAIL_PASS,
                }
            } 
        })
    ],
    controllers: [IndexController],
    providers: [IndexService]
})
export class IndexModule {}