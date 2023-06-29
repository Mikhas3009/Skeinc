// Импорты
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import { join, parse } from 'path';
import { CompanyModel } from 'src/models/DB-sequelize-models/modelCompany';
import { UserModel } from 'src/models/DB-sequelize-models/modelUser';
import { Op } from 'sequelize';
import { unlink } from 'fs';
import { AuthService } from 'src/auth/auth.service';
import { TaskModel } from 'src/models/DB-sequelize-models/modelTask';
import { ProjectsTasksService } from 'src/projects-tasks/projects-tasks.service';

@Injectable()
export class PersonalCabinetService {
    constructor(
        // Инъекция моделей
        @InjectModel(UserModel)private userDB:typeof UserModel,
        @InjectModel(CompanyModel)private companyDB:typeof CompanyModel,
        private authService:AuthService,
        private taskService:ProjectsTasksService
    ){}
    // Обновление персональных данных
    async updatePersonalCabinet(req:Request,token?:string):Promise<void>{
        const{updateUserName, updateUserEmail,updateUserPhone,updateUserAddress,updateUserCard,updateUserPost}=req.body;
        const {id,role}=this.authService.decodeToken(req.cookies.AccsesToken);
        if(role !=="Администратор"){
            await this.userDB.update(
                {
                    fio:req.body.updateEmployeeProfileName,
                    phone:req.body.updateEmployeeProfilePhone,
                    email:req.body.updateEmployeeProfileEmail,
                    address:req.body.updateEmployeeProfileAddress,
                    card:req.body.updateEmployeeProfileCard,
                },
                {where:{id:id}}
                ).catch(err=>{throw new HttpException("Не удалось обновить данные",HttpStatus.BAD_REQUEST)});
            return;
        }
        const response = await this.userDB.update(
            {
                fio:updateUserName,
                phone:updateUserPhone,
                email:updateUserEmail,
                address:updateUserAddress,
                card:updateUserCard,
                post:updateUserPost},
            {where:{id:id}}
            ).catch(err=>{
                console.log(err);
                throw new HttpException("Не удалось обновить данные",HttpStatus.BAD_REQUEST)}
            );
        if(!response){
            throw new Error("Неудалось обновить");
        }
    }
    // Получение сотрудников
    async getEmployees(token:string):Promise<UserModel[]>{
       const {companyID}=this.authService.decodeToken(token);
       return await this.userDB.findAll({where:{company_id:companyID}});
    }
    // Получение компании
    async getCompany(companyCode:string):Promise<CompanyModel>{
        return await this.companyDB.findOne({where:{code:companyCode}});
    }
    // Получение пользователя
    async getUser(token:string):Promise<UserModel> {
       const {id}=this.authService.decodeToken(token);
       return (await this.userDB.findOne({where:{id:id}}));
    }
    // Получение задач
    async getTasks(token: string):Promise<TaskModel[]>{
        const {id}=this.authService.decodeToken(token);
        return await this.taskService.getTaskByIdUser(id);
    }
    // Добавление аватара
    async addAvatar(req: Request, token ,file) {
        const {id}=this.authService.decodeToken(token);
        const response = await this.userDB.update(
            {avatar:file.filename},
            {where:{id:id}}
        );
        if(!response){
            throw new Error("Не удалось добавить");
        }
    }
    // Обновление информации компании
    async updateCompanyData(req: Request) {
        const{updateCompanyName,updateCompanyAddress,updateCompanyPhone, updateCompanyEmail}=req.body;
        const{companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        await this.companyDB.update(
            { 
                company_name:updateCompanyName,
                company_address:updateCompanyAddress,
                company_email: updateCompanyEmail,
                company_phone:updateCompanyPhone
            },
            {where:{id:companyID}}
        )
    }
    // Удаление сотрудников
    async deleteEmployes(req: Request) {
        const idUsers:number[]=[];
        req.body.forEach(async elem=> {
          idUsers.push(elem[0]);
        });  
        const destroyed= await this.userDB.destroy({where:{id:{[Op.in]:idUsers}}})
        if(destroyed==0){
            throw new Error('Не удалось выполнить удаление');
        }
    }
    // Обновление рабочих данных у сотрудников
    async updateEmployes(req: Request) {
        await req.body.forEach(async elem=> {
            if(elem[0]==this.authService.decodeToken(req.cookies.AccsesToken).id){
                elem[4]='Администратор';
            }
            await this.userDB.update(
                {fio:elem[1],post:elem[2]||'-',salary:elem[3]||0,role:elem[4]},
                {where:{id:elem[0]}}
            )
        });
    }
    // Сохрание аватарки
    async saveAvatar(req:Request,  path: string) {
        const {id,company}=this.authService.decodeToken(req.cookies.AccsesToken);
        const oldAvatar = (await this.userDB.findOne({where:{id:id}})).dataValues.avatar;
        if(oldAvatar){
            try{
                unlink(join('.', 'uploads', company, oldAvatar), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
            catch(err){
                throw err;
            }
        }
        const {name,ext}=parse(path)
        await this.userDB.update(
           {avatar:name+ext},
           {where:{id:id}}
        )
    }
}