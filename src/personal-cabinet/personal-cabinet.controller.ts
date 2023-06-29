// Импорты
import {Body, Controller, Delete, Get, Param, Post, Put, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { PersonalCabinetService } from './personal-cabinet.service';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { editFileName, imageFileFilter } from 'src/hepls-services/files.service';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { NonAuthInterceptor } from '../auth/interceptors/interceptor-non-authorization';
import { AuthService } from 'src/auth/auth.service';
import { CompanyFilterService } from './company-filter.service';
import { AdminGuard } from 'src/guards/admin-guard';
import { CreateFilterDto } from 'src/models/dtos/FilterDto';
// Перехват незарегистрированных пользователей
@UseInterceptors(NonAuthInterceptor)
@Controller('/')
export class PersonalCabinetController {
    constructor(
      private userService: PersonalCabinetService,
      private authService: AuthService,
      private filterService:CompanyFilterService,
    ){}
    // Страница личного кабинета администратора
    @Get('/personal')
    @Render('admin-user-profile.ejs') 
    async getAdminPage(@Req()req:Request,@Res() res:Response){
        const token = req.cookies.AccsesToken;
        if((await this.userService.getUser(token)).dataValues.role=='Администратор'){
            const user = (await this.userService.getUser(token)).dataValues;
            const employees = await this.userService.getEmployees(token);
            const {companyName}= await this.authService.decodeToken(token) ;
            const company = (await this.userService.getCompany(user.company)).dataValues;
            const filters= await this.filterService.getFilters(req);
            return {user, employees,companyName,company,filters}
        } 
        else {
            res.redirect('/employer');
        }
    }
    // Страница личного кабинета сотрудника или редактора
    @Get('/employer')
    @Render('employee-user-profile')
    async getEmployerProfile(@Req()req:Request,@Res()res:Response){
        console.log(req.cookies);
        const token = req.cookies.AccsesToken;
        const user = (await this.userService.getUser(token)).dataValues;
        const filters= await this.filterService.getFilters(req);
        if(user.role == 'Администратор'){
            res.redirect('/personal')
        }
        const tasks = await this.userService.getTasks(token);
        const company = (await this.userService.getCompany(user.company)).dataValues;
        const isWorkerStarted = req.cookies.WorkStart;
        const customTask = req.cookies.CustomTask;
        return{user,tasks,isWorkerStarted,company,customTask,filters}
    }
    // Выход из аккаунта
    @Get('/logout')
    async logOut(@Req()req:Request,@Res()res:Response){
        for(const cookieName in req.cookies){
            res.clearCookie(cookieName);
        }
        res.redirect('/');
    }
    // Добавление аватарки
    @Post('/addAvatar')
    @UseInterceptors(
      FileInterceptor('image',{
        storage: diskStorage({
          destination: (req, file:any, cb: any) => {
            const uploadPath =join('.','uploads',JSON.parse(JSON.stringify(new JwtService().decode(req.cookies.AccsesToken))).company);
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
          },
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async addAvatar(@Req()req:Request,@UploadedFile() file,@Res()res){
        console.log(this.authService.decodeToken(req.cookies.AccsesToken))
        if(!file){
            res.redirect('/personal')
        }
        try{
            await this.userService.saveAvatar(req,file.path)
            res.redirect('/personal');
        }
        catch(err){
            res.redirect('/error');
        }
    }
    // Изменение персональных данных пользователя
    @Put('/personal')
    async updateUserData(@Req()req:Request,@Res()res:Response){
        const token = req.cookies.AccsesToken;
        try{
            await this.userService.updatePersonalCabinet(req,token);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.send(err);
        }    
    }
    // Изменение данных о сотрудниках
    @UseGuards(AdminGuard)
    @Put('/updateEmployes')
    async updateEmployes(@Req()req,@Res()res:Response){
        try{
            await this.userService.updateEmployes(req);
            res.sendStatus(200);
        } 
        catch(err){
            console.log(err);
            res.send({body:err.message,status:404});
        }
    }
    // Удаление сотрудников
    @UseGuards(AdminGuard)
    @Delete('/deleteEmployes')
    async deleteEmployes(@Req() req,@Res()res){
        try{
            if(req.body.length >= 1){
                await this.userService.deleteEmployes(req);
                res.sendStatus(200);
            }
        }
        catch(err){
          res.send(err);
        }
    }
    // Обновление информации компании
    @UseGuards(AdminGuard)
    @Put('/updateCompnayData')
    async updateCompnayData(@Req()req,@Res()res){
        try{
            await this.userService.updateCompanyData(req);
            res.sendStatus(200);
        } 
        catch(err){
            res.send(err)
        }
    }
    // Добавление фильтров тайм-менеджера
    @UseGuards(AdminGuard)
    @Post('/addFilter')
    async addCompanyFilter(@Res()res:Response,@Body()filter:CreateFilterDto){
        try{
            await this.filterService.addFilter(filter);
            res.sendStatus(200);
        }
        catch(err){
            res.send(err)
        }
    }
    // Удаление фильтров тайм-менеджера
    @UseGuards(AdminGuard)
    @Delete('/deleteFilter')
    async deleteCompanyFilter(@Req()req:Request,@Res()res:Response){
        try{
            await this.filterService.deleteFilters(req);
            res.sendStatus(200);
        }
        catch(err){
            res.send(err)
        }
    }
    // Получение фотографии с сервера
    @Get('/images:imagename')
    getImage(@Param('imagename') image,@Req()req:Request, @Res() res) {
        try{
            const path = join('.','uploads',this.authService.decodeToken(req.cookies.AccsesToken).company)
            const response = res.sendFile(image.substring(1), { root: path });
            return {
                status: 200,
                data: response,
            };
        }
        catch(err){
            res.sendFile('new-user.png', {root:join('.','uploads')});
        }
    }
}