// Импорты
import { Controller, Delete, Get, Post, Put, Render, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { NewsService } from './news.service';
import { NonAuthInterceptor } from 'src/auth/interceptors/interceptor-non-authorization';
import { RoleGuard } from 'src/guards/role-guard.guard';
import { PersonalCabinetService } from 'src/personal-cabinet/personal-cabinet.service';

@UseInterceptors(NonAuthInterceptor)
@Controller('/')
export class NewsController {
    constructor(
        private newsService:NewsService,
        private userService:PersonalCabinetService,
        ){}
    // Получение страницы новостей
    @Render('news-manager')
    @Get('/news')
    async getNewsPage(@Req() req:Request,@Res() res:Response){
        try{
            const news = await this.newsService.getNews(req);
            const user = (await this.userService.getUser(req.cookies.AccsesToken)).dataValues;
            return {news,user}
        }
        catch(err){
           res.redirect('/error'); 
        }
    }
    // Удаление новости
    @UseGuards(RoleGuard)
    @Delete('/news')
    async deleteNews(@Req() req:Request,@Res() res:Response){
        console.log(req.body);
        try{
            await this.newsService.deleteNews(req);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.send(err.message);
        }
    }
    // Добавление новости
    @UseGuards(RoleGuard)
    @Post('/addNews')
    async addNews(@Req() req:Request,@Res() res){
        console.log(req.body);
        try{
            await this.newsService.addNews(req);
            res.sendStatus(200)
        }
        catch(err){
            res.send(err.message);
        }
    }
}