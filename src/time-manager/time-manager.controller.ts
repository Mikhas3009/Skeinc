// Импорты
import { Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { NonAuthInterceptor } from 'src/auth/interceptors/interceptor-non-authorization';
import { TimeManagerService } from './time-manager.service';
import { AdminGuard } from 'src/guards/admin-guard';

@UseInterceptors(NonAuthInterceptor)
@Controller('/')
export class TimeManagerController {
    constructor(private timeManagerService:TimeManagerService){}
    // Сотрудник начал рабочий день
    @Post('/time-manager-start')
    async startWorkDay(@Req() req:Request,@Res()res:Response){
        console.log(req.cookies);
        if(!req.cookies.WorkStart){
          try{
              await this.timeManagerService.workerStartDay(req);
              res.cookie('WorkStart',true,{maxAge:1000*60*60*24});
              res.sendStatus(200);
          }
          catch(err){
              console.log(err);
              res.send(err);
          }
        }
        else{
            res.send({message:"Вы уже начали рабочий день!",status:404});
        }
    }
    // Принятие задачи сотрудником
    @Post('/time-manager-accept')
    async acceptTask(@Req() req:Request,@Res()res:Response){
        console.log(req.headers);
        try{
            await this.timeManagerService.acceptTask(req);
            res.sendStatus(200);
        }
        catch(err){
            res.send(err);
            console.log(err);
        }
    }
    // Отправка задачи на проверку
    @Post('/time-manager-check')
    async checkTask(@Req() req:Request,@Res()res:Response){
        try{
            await this.timeManagerService.checkTask(req);
            res.sendStatus(200);
        }
        catch(err){
            res.send(err);
            console.log(err);
        }
    }
    // Сотрудник ВЫБРАЛ задачу из списка кастомных или написал свою
    @Post('/time-manager-custom-task')
    async customTask(@Req() req:Request,@Res()res:Response){
        try{
            const taskStatus = await this.timeManagerService.addInTimeManager(req);
            if(taskStatus!== "Закончил"){
                res.cookie('CustomTask',req.body.TimeManagerTitle.split(':')[1].replace(' ',''));
            }
            res.sendStatus(200);
        }
        catch(err){
            res.send(err)
            console.log(err)
        }
    }
    // Сотрудник завершил рабочий день
    @Post('/time-manager-end')
    async endWorkDay(@Req() req:Request,@Res()res:Response){
        try{
            console.log(req.body);
            await this.timeManagerService.workerEndDay(req);
            res.clearCookie('WorkStart');
            res.clearCookie('CustomTask');
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    }
    // Сотрудник завершил собственную задачу
    @Get('/end-time-manager-custom-task')
    async endCustomTask(@Req() req:Request,@Res()res:Response){
        console.log(req.cookies)
        res.clearCookie('CustomTask');
        res.sendStatus(200);
    }

    @UseGuards(AdminGuard)
    @Post('/check-time-manager-employee')
    async getEmployerTimeManagerInfo(@Req() req:Request,@Res()res:Response){
        try{
           const analytics = await this.timeManagerService.getEmployeAnalitics(req);
           res.send(analytics)
        }
        catch(err){
            res.sendStatus(502);
        }
    }
}