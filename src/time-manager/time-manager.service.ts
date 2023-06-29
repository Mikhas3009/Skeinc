// Импорты
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { TimeManagerModel } from 'src/models/DB-sequelize-models/modelTimeManager';
import { ProjectsTasksService } from 'src/projects-tasks/projects-tasks.service';

@Injectable()
export class TimeManagerService {
    // Инъекция моделей
    constructor(
        @InjectModel(TimeManagerModel)private timeManagerDB:typeof TimeManagerModel,
        private taskService:ProjectsTasksService,
    ){}
    // Сотрудник начал рабочий день
    async workerStartDay(req:Request){
        const {StartDayUserId, StartDayCompanyId,StartDayDate,StartDayTime,StartDayTitle}=req.body;
        await this.timeManagerDB.create({
            user_id: StartDayUserId,
            company_id:StartDayCompanyId,
            time_manager_date:StartDayDate,
            time_manager_time:StartDayTime,
            time_manager_title:StartDayTitle
        }).catch(err=>{
            throw new HttpException("Не удалось начать рабочий день",HttpStatus.BAD_GATEWAY);
        })
    }
    // Сотрудник закончил рабочий день
    async workerEndDay(req:Request){
        const {EndDayUserId, EndDayCompanyId,EndDayDate,EndDayTime,EndDayTitle}=req.body;
        await this.timeManagerDB.create({
            user_id: EndDayUserId,
            company_id:EndDayCompanyId,
            time_manager_date:EndDayDate,
            time_manager_time:EndDayTime,
            time_manager_title:EndDayTitle
        }).catch(err=>{
            throw new HttpException("Не удалось закончить рабочий день",HttpStatus.BAD_GATEWAY);
        })
    }
    // Сотрудник принял задачу
    async acceptTask(req:Request){
        const{TimeManagerTaskId}=req.body;
        await this.addInTimeManager(req)
          .catch(()=>{throw new HttpException("Не удалось принять задачу",HttpStatus.BAD_GATEWAY)})
        await this.taskService.updateTaskStatus(TimeManagerTaskId,"In Progress")
          .catch(()=>{throw new HttpException("Не удалось принять задачу",HttpStatus.BAD_GATEWAY)})
    }
    // Сотрудник отправил задачу на проверку
    async checkTask(req:Request){
        const{TimeManagerTaskId}=req.body;
        console.log(req.body)
        await this.addInTimeManager(req)
          .catch(()=>{throw new HttpException("Не удалось отправить задачу",HttpStatus.BAD_GATEWAY)})
        await this.taskService.updateTaskStatus(TimeManagerTaskId,"Needs Review")
          .catch(()=>{throw new HttpException("Не удалось отправить задачу",HttpStatus.BAD_GATEWAY)})
    }
    // Добавление в БД в таблицу тайм-менеджера
    async addInTimeManager(req:Request){
        console.log(req.body);
        const{TimeManagerUserId,TimeManagerCompanyId,TimeManagerDate, TimeManagerTime,TimeManagerTitle,TimeManagerTaskId}=req.body;
        await this.timeManagerDB.create({
            user_id: TimeManagerUserId,
            company_id:TimeManagerCompanyId,
            time_manager_date:TimeManagerDate,
            time_manager_time: TimeManagerTime,
            time_manager_title:TimeManagerTitle,
            task_id:TimeManagerTaskId,
        }).catch(err=>{
            console.log(err);
            throw err;
        })
        const taskStatus = TimeManagerTitle.split(' ')[0];
        return taskStatus;
    }

    async getEmployeAnalitics(req:Request):Promise<TimeManagerModel[]>{
        console.log(req.body);
        const userId=req.body[0];
        const analyticsDate=req.body[2];
        return await this.timeManagerDB.findAll(
            {
                where:[
                    {user_id:userId},
                    {time_manager_date:analyticsDate}
                ],
                attributes:['time_manager_time','time_manager_title']
            },
        ).catch((err)=>{
            console.log(err);
            throw new HttpException("Не удалось получить информацию о сотруднике",HttpStatus.BAD_GATEWAY);
        })
    }
}