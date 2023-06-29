import { Controller,Get, Post, Render, Req,Res } from '@nestjs/common';
import { Request } from 'express';
import { IndexService } from './index.service';

@Controller('/')
export class IndexController {

    constructor(private indexService:IndexService){}

    @Get('/')//получение основной страницы
    @Render('index')
    async index() {}
    
    @Post('/mail')//отправка обратной связи
    async sendMail(@Req() req:Request,@Res()res){
        try{
            await this.indexService.sendMail(req.body);
            res.redirect('/');  
        }
        catch(err){
            console.log(err);
            res.redirect('/error');
        }
    }

    @Get('/error')
    @Render('error-page')
    async getError(@Req() req:Request) {}
}