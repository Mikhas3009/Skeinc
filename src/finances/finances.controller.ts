// Импорты
import { Controller, Get, Post, Put, Render, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { Request, Response } from 'express';
import { NonAuthInterceptor } from 'src/auth/interceptors/interceptor-non-authorization';
import { RoleGuard } from 'src/guards/role-guard.guard';
import { PersonalCabinetService } from 'src/personal-cabinet/personal-cabinet.service';

@UseInterceptors(NonAuthInterceptor)
@UseGuards(RoleGuard)
@Controller('/')
export class FinancesController {
    constructor(
        private financesService:FinancesService,
        private userService:PersonalCabinetService,
        ){}
    // Получение страницы с финансами
    @Get('/finances')
    @Render('finance-manager')
    async getFinancesPage(@Req()req:Request,@Res()res:Response){
        const transactions= await this.financesService.getTransactions(req);
        const user = (await this.userService.getUser(req.cookies.AccsesToken)).dataValues;
        transactions.reverse();
        return {transactions,user}
    }
    // Добавление транзакции
    @Post('/addTransaction')
    async addTransaction(@Req()req:Request,@Res()res:Response){
        try{
            await this.financesService.addTransaction(req);
            res.sendStatus(200);
        }
        catch(err){
            res.send(err);
        }
    }
    @Put('/finance-manager')
    async getFinancesManager(@Req()req:Request){
        try{
           const transactions= await this.financesService.getTransactions(req);
           return{transactions}
        }
        catch(err){
            console.log(err);
        }
    }
}