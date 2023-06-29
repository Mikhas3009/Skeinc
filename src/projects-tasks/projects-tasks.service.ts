// Импорты
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { AuthService } from 'src/auth/auth.service';
import { ProjectModel } from 'src/models/DB-sequelize-models/modelProject';
import { TaskModel } from 'src/models/DB-sequelize-models/modelTask';
import { UserModel } from 'src/models/DB-sequelize-models/modelUser';

@Injectable()
export class ProjectsTasksService {
   // Инъекция моделей
    constructor(
        @InjectModel(ProjectModel)private projectDB:typeof ProjectModel,
        @InjectModel(TaskModel)private taskDB:typeof TaskModel,
        @InjectModel(UserModel)private userDB:typeof UserModel,
        private authService:AuthService,
    ){}
    // Добавление проекта
    async addProject(req: Request) {
        const { NewProjectName, NewProjectDecription, NewProjectDate}=req.body;
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        await this.projectDB.create({
            project_name: NewProjectName,
            project_description:NewProjectDecription,
            project_date:NewProjectDate,
            company_id:companyID
        })
        .catch(err=>{
            throw err;
        })
    }
    // Получение пользователя
    async getUser(token:string):Promise<UserModel> {
        const {id}=this.authService.decodeToken(token);
        return (await this.userDB.findOne({where:{id:id}}));
    }
    // Получение проектов
    async getProjects(req: Request) {
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        const projects= await this.projectDB.findAll(
            {
                where: {company_id:companyID},
                include: [{
                    model: TaskModel,
                  }],
            })
        .catch(err=>{throw err})
        return projects
    }
    // Удаление проекта
    async deleteProject(req: Request) {
        const{DeletedIdProject}=req.body;
        await this.projectDB.update({project_status:"Done"},{where:{project_id:DeletedIdProject}}).catch(err=>{throw err});
    }
    // Удаление задач
    async deleteTasks(req: Request) {
        const idTasks:number[]=[];
        req.body.forEach(async elem=> {
           idTasks.push(elem[0]);
        });  
        await this.taskDB.destroy({where:{task_id:{[Op.in]:idTasks}}}).catch(err=>{throw err})
    }
    // Поиск задачи по id проекта
    async getTaskById(req:Request){
        const projectID= req.params.id.replace(/[^0-9]/g,"");
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        const project = await this.projectDB.findOne({where:{project_id:projectID}})
        if(project.company_id!=companyID){
            throw new HttpException('Такого проекта не существует в вашей компании',404);
        }
        if((await this.projectDB.findAll({where:{project_id:projectID}})).length==0){
            throw new HttpException('Такого проекта не существует в вашей компании',404);
        }
        const tasks = await this.taskDB.findAll({
            where:{project_id:projectID},
            include:[{model:UserModel}]
        }).catch((err)=>{throw err})
        const users = await this.userDB.findAll({where:{company_id:companyID}});
        return{tasks,users}
    }
    // Поиск задачи по id пользователя
    async getTaskByIdUser(userID:number):Promise<TaskModel[]>{
        return await this.taskDB.findAll(
            {
                where:{user_id:userID},
                include:{model:ProjectModel}
            });
    }
    // Обновление статуса задачи
    async updateTaskStatus(taskId:number,status:string){
        return await this.taskDB.update({task_status:status},{where:{task_id:taskId}}).catch(error=>{throw error});
    }
    // Добавление задачи
    async addTask(req:Request){
        console.log(req.body);
        const {NewTaskName,NewTaskDescription,NewTaskDate,NewTaskPriority,NewTaskUserId} = req.body
        const projectID= req.params.id.replace(/[^0-9]/g,"")
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        await this.taskDB.create({
            task_name:NewTaskName,
            task_description:NewTaskDescription,
            task_date:NewTaskDate,
            task_priority:NewTaskPriority,
            task_status:"Task Ready",
            company_id:companyID,
            project_id:projectID,
            user_id:NewTaskUserId
        }).catch((err)=>{
            throw err;
        });
    }
    // получение последние задачи
    async getLatestTask(req:Request){
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        const allTasks= (await this.taskDB.findAll({
            where:{company_id:companyID,task_status:"Done"}
        })
          .catch(()=>{throw new HttpException("Не удалось получить список задач",HttpStatus.BAD_GATEWAY)}));
        let latestTasks:TaskModel[]=[];
        if(allTasks.length <= 4){
            latestTasks=allTasks
        }
        else{
            latestTasks=allTasks.splice(0,allTasks.length-4);
        }
        const numberOfTasks=allTasks.length;
        latestTasks.reverse();
        return {latestTasks,numberOfTasks}
    }
    // Получение завершенных проектов
    async getDoneProjects(req:Request){
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        const projects= await this.projectDB.findAll(
            {
                where: {company_id:companyID,project_status:"Done"},
            })
        .catch(err=>{throw err})
        return projects
    }
}