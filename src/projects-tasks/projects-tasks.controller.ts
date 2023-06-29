// Импорты
import { Controller, Delete, Get, Post, Put, Render, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request,Response } from 'express';
import { ProjectsTasksService } from './projects-tasks.service';
import { NonAuthInterceptor } from 'src/auth/interceptors/interceptor-non-authorization';
import { RoleGuard } from 'src/guards/role-guard.guard';

@UseInterceptors(NonAuthInterceptor)
@UseGuards(RoleGuard)
@Controller('/')
export class ProjectsTasksController {
    
    constructor(
        private projectTaskService:ProjectsTasksService,
    ){}
    // Получение страницы с проектами
    @Get('/projects')
    @Render('project-manager')
    async getProjectsPage(@Req() req:Request,@Res() res:Response) {
        try{
            const projects=await this.projectTaskService.getProjects(req);
            const user = (await this.projectTaskService.getUser(req.cookies.AccsesToken)).dataValues;
            return{projects,user}
        }
        catch(err){
            res.redirect('/error')
            console.log(err);
        }
    }
    // Добавление проекта
    @Post('/projects')
    async addProject(@Req() req:Request,@Res() res:Response){
        try{
            await this.projectTaskService.addProject(req);
            res.sendStatus(200)
        }
        catch(err){
            console.log(err);
            res.send(err.message)
        }
    }
    // Получение страницы задач
    @Get('/tasks:id')
    @Render('task-manager')
    async getTasksPage(@Req() req:Request, @Res() res:Response) {
        try{
           const {tasks,users}= await this.projectTaskService.getTaskById(req);
           const user = (await this.projectTaskService.getUser(req.cookies.AccsesToken)).dataValues;
           return {users,tasks,user}
        }
        catch(err){
            console.log(err);
            res.send(err.message);
        }
    }
    // Добавление задачи в определенный проект по id
    @Post('/tasks:id')
    async addTask(@Req() req:Request,@Res() res:Response) {
        try{
            await this.projectTaskService.addTask(req);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    }
    // Удаление проектов
    @Delete('/projects')
    async deleteProject(@Req() req:Request,@Res() res:Response){
        try{
            await this.projectTaskService.deleteProject(req);
            res.sendStatus(200);
        }
        catch(err){
            res.send(err);
        }
    }
    // Удаление задачи из определенного проекта по id
    @Delete('/tasks:id')
    async deleteTask(@Req() req:Request,@Res()res:Response){
        try{
            await this.projectTaskService.deleteTasks(req);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    }
    // Завершение задачи
    @Put('/finishTask')
    async finishTask(@Req() req:Request,@Res()res:Response){
        try{
            const{UpdateTaskId}=req.body;
            await this.projectTaskService.updateTaskStatus(UpdateTaskId,"Done");
            res.sendStatus(200)
        }
        catch(err){
            res.send(err);
        }
    }
}