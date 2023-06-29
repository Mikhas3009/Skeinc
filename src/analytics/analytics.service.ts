//Импорты
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { FinancesService } from 'src/finances/finances.service';
import { PersonalCabinetService } from 'src/personal-cabinet/personal-cabinet.service';
import { ProjectsTasksService } from 'src/projects-tasks/projects-tasks.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private financesService:FinancesService,
        private personalCabinetService:PersonalCabinetService,
        private projectTasksService:ProjectsTasksService,
        ){}
    // Получение транзакций
    async getTransactions(req:Request){
       const transactions= await this.financesService.getTransactions(req)
            .catch(()=>{
                throw new HttpException("Не удалось получить транзакции",HttpStatus.BAD_GATEWAY)
            });
        let income=0,expenses=0;
        let latestTransactions=[];
        const numberOfTransactions= transactions.length;
        transactions.forEach(({dataValues:{finance_cost,finance_status,finance_id,finance_date,finance_name}},index)=>{
            if(index >=transactions.length-4){
                latestTransactions.push({finance_cost,finance_status,finance_id,finance_date,finance_name})
            }
            finance_status==="Доходы"?income+=finance_cost:expenses+=finance_cost;
        })
        this.reverseArray.call(latestTransactions);
        return {income,expenses,numberOfTransactions,latestTransactions}
    }
    // Получение сотрудников
    async getEmployees(req:Request){
       const employees= await this.personalCabinetService.getEmployees(req.cookies.AccsesToken)
          .catch(()=>{throw new HttpException("Не удалось получить сотрудников",HttpStatus.BAD_REQUEST)});
        let highestSalary=0;
        let salarySum=0;
        employees.forEach(({dataValues:{salary}})=>{
            highestSalary<salary?highestSalary=salary:false;
            salarySum+=salary;
        })
        const numberOfEmployees = employees.length;
        const averageSalary = (salarySum/employees.length).toFixed(2);
        return{highestSalary,salarySum,averageSalary,numberOfEmployees,employees}
    }
    // Получение задач
    async getTasks(req:Request){
       return await this.projectTasksService.getLatestTask(req).catch((err)=>{throw err});
    }
    // Получение проектов
    async getNumberOfProjects(req:Request){
        return (await this.projectTasksService.getDoneProjects(req)
                    .catch(()=>{throw new HttpException("не удалось загрузить проекты",HttpStatus.BAD_GATEWAY)}))
                    .length
    }
    // Функция для reverse массива
    reverseArray(this:any[]){
        return this.reverse();
    }
}