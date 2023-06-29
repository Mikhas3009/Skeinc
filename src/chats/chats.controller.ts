import { Controller, Get, Post, Render, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { NonAuthInterceptor } from 'src/auth/interceptors/interceptor-non-authorization';
import { ChatsService } from './chats.service';

@UseInterceptors(NonAuthInterceptor)
@Controller('/')
export class ChatsController {

    constructor(private chatsService:ChatsService){}

   
    @Get('/chats')
    @Render('chat-manager')
    async getChatsPage(@Req()req:Request,@Res()res:Response){
        try{
            const employees = await this.chatsService.getEmployees(req);
            const user = (await this.chatsService.getUser(req)).dataValues;
            return {employees,user}
        }
        catch(err){
            res.redirect('/error');
        }
    }

    @Post('/getMessages')
    async getMessages(@Req()req:Request){
        try{
            return await this.chatsService.getMessages(req);
        }
        catch(err){
            return err;
        }
    }
}