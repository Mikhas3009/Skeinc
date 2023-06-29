import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { mailForm } from 'src/models/contactsEmailForm';

@Injectable()
export class IndexService {

    constructor(private readonly mailService:MailerService){};

    async sendMail(req: mailForm ) {//отправка письма
       await this.mailService.sendMail({
            to: 'ske3y@mail.ru'||process.env.ADMIN_EMAIL,
            from: `ske3y@mail.ru`||process.env.SERVER_EMAIL,
            subject: `Сообщение с сайта Skeinc`,
            text: `Тема сообщения: ${req.subject}\nОт кого: ${req.email}, ${req.name}\nСообщение: ${req.message}`
        }).catch((err)=>{throw err})
    }
}