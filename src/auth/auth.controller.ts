import { Controller, Get,Render,Post,Req,Res, Body, UsePipes,ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/models/dtos/UserDto';

@Controller('/')
export class AuthController {
    constructor(private authService:AuthService){}

    @Get('/signin')//Получение страницы авторизации
    @Render('signin')
    async getAuthPage(){
        let failer= undefined;
        let success=undefined;
        return {success,failer}
    }

    @Get('/signup')//Получение страницы регистрации
    @Render('signup')
    async getRegPage(){
        let failer= undefined;
        let success=undefined;
        return {success,failer}
    }

    @Get('/forgotpassword')
    @Render('forgot-password')
    async getForgotPasswordPage(){
        const requestError=false;
        const requestSuccess=false;
        return{requestError,requestSuccess}
    }//Получение страницы забыл пароль

    @Render('signup')
    @Post('/addUser')
    @UsePipes(ValidationPipe)//Валидация входящего запроса
    async addUser(@Req() req:Request,@Res() res:Response,@Body()createUserDto:CreateUserDto){//добавления пользователя(обычный сотрудник)
        try{
            const token = await this.authService.addUser(req);
            res.cookie("AccsesToken",token,{maxAge:1000*60*60*24*60});
            res.redirect('/employer');
        }
        catch(err){
            let failer=err.message;
            let success=undefined;
            return {success,failer}
        }
    }

    @Render('signup')
    @Post('/addAdmin')
    @UsePipes(ValidationPipe)
    async addAdmin(@Req() req:Request,@Res() res:Response,@Body()createUserDto:CreateUserDto){//добавление администратора
        try{
            console.log(req.body);
            const token= await this.authService.addAdmin(req);
            res.cookie("AccsesToken",token,{maxAge:1000*60*60*24*60});
            console.log(token);
            res.redirect('/personal');
        }
        catch(err){
            await this.authService.destroyAdmin();
            let failer=err.message;
            let success=undefined;
            console.log(err.message)
            return {success,failer}
        }
    }

    @Post('/auth')
    @Render('signin')
    async auth(@Req() req:Request,@Res() res:Response){//авторизация
        try{
            const {token,role} = await this.authService.authorization(req);
            res.cookie("AccsesToken",token,{maxAge:1000*60*60*24*60});
            role=="Администратор"? res.redirect('/personal'): res.redirect('/employer')
        }
        catch(err){
            let failer=err.message;
            console.log(failer);
            let success=undefined;
            return{failer,success}
        }
    }

    @Render('forgot-password')
    @Post('/forgotpassword')
    async forgotpassword(@Req() req:Request,@Res() res:Response){//отправка письма если забыл пароль
       try{
            const requestError=false;
            const requestSuccess= await this.authService.sendMailPass(req);;
            return{requestError,requestSuccess}
       } 
       catch(err){
           const requestError = err.message;
           const requestSuccess = false;
           return {requestError,requestSuccess}
       }
    }
}