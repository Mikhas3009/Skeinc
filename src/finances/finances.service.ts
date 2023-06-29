import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { FinanceModel } from 'src/models/DB-sequelize-models/modelFinances';

@Injectable()
export class FinancesService {
    // Инъекция моделей
    constructor(
        @InjectModel(FinanceModel)private financeDB:typeof FinanceModel,
        private authService:AuthService,
    ){}
    // Добавление транзакции
    async addTransaction(req: Request) {
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        const {NewFinanceName,NewFinanceCost,NewFinanceStatus,NewFinanceDate}=req.body;
        console.log(req.body);
        await this.financeDB.create({
            finance_status: NewFinanceStatus,
            finance_date: NewFinanceDate,
            company_id: companyID,
            finance_name: NewFinanceName,
            finance_cost: NewFinanceCost,
        }).catch((err) => {throw new HttpException("Не удалось добавить транзакцию",HttpStatus.BAD_REQUEST)})
    }
    // Получение транзакции
    async getTransactions(req:Request){
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        return await this.financeDB.findAll({where:{
            company_id:companyID,
        }}).catch((err) => {throw new HttpException("Не удалось добавить транзакцию",HttpStatus.BAD_REQUEST)})
    }
}