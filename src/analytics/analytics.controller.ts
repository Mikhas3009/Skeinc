// Импорты
import { Controller, Get, Render, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { NonAuthInterceptor } from 'src/auth/interceptors/interceptor-non-authorization';
import { AnalyticsService } from './analytics.service';
import { AdminGuard } from 'src/guards/admin-guard';
import { PersonalCabinetService } from 'src/personal-cabinet/personal-cabinet.service';


@UseInterceptors(NonAuthInterceptor)
@UseGuards(AdminGuard)
@Controller('/')
export class AnalyticsController {
    constructor(
        private analyticsService:AnalyticsService,
        private userService:PersonalCabinetService,
    ){}
    // Получение страницы с аналитикой
    @Get('/analytics')
    @Render('analytics-manager')
    async getAnalytics(@Req()req:Request,@Res()res:Response){
        try{
            const {income, expenses,numberOfTransactions,latestTransactions}=await this.analyticsService.getTransactions(req);
            const{highestSalary,salarySum,averageSalary,numberOfEmployees,employees}=await this.analyticsService.getEmployees(req);
            const{latestTasks,numberOfTasks}=await this.analyticsService.getTasks(req);
            const user = (await this.userService.getUser(req.cookies.AccsesToken)).dataValues;
            const numberOfProjects=await this.analyticsService.getNumberOfProjects(req);
            return{
                income,
                expenses,
                numberOfEmployees,
                numberOfTransactions,
                highestSalary,
                salarySum,
                averageSalary,
                latestTransactions,
                latestTasks,
                numberOfTasks,
                user,
                numberOfProjects,
                employees
            }
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    }
}