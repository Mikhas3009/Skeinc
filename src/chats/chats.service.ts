import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { AuthService } from 'src/auth/auth.service';
import { ChatModel } from 'src/models/DB-sequelize-models/modelChat';
import { UserModel } from 'src/models/DB-sequelize-models/modelUser';
import { PersonalCabinetService } from 'src/personal-cabinet/personal-cabinet.service';

@Injectable()
export class ChatsService {

    constructor(
        private employesService:PersonalCabinetService,
        @InjectModel(ChatModel)private chatDB:typeof ChatModel,
        private authService:AuthService,
    ){}

    async getEmployees(req:Request):Promise<UserModel[]>{
        return await this.employesService.getEmployees(req.cookies.AccsesToken)
                .catch(()=>{
                    throw new HttpException("Не удалось получить список сотрудников",HttpStatus.BAD_GATEWAY)
                }); 
    }

    async getUser(req:Request):Promise<UserModel>{
        return await this.employesService.getUser(req.cookies.AccsesToken)
                .catch(()=>{
                    throw new HttpException("Не удалось получить пользователя по токену",HttpStatus.BAD_GATEWAY)
                }); 
    }

    async saveMessage(socketData){
        const{userSenderID,userRecipientId,text,time,date,}=socketData;
        await this.chatDB.create({
            chat_message:text,
            chat_date:date,
            chat_time:time,
            user_id_from:userSenderID,
            user_id_to:userRecipientId
        }).catch(()=>{
            throw new HttpException("Не удалось сохранить сообщение",HttpStatus.BAD_GATEWAY)
        })
    }

    async getMessages(req:Request):Promise<ChatModel[]>{
        const{id}=this.authService.decodeToken(req.cookies.AccsesToken);
        const{receiverId}=req.body;
        return await this.chatDB.findAll(
            {where:{
                [Op.or]: [
                    { user_id_from: id, user_id_to: receiverId },
                    { user_id_from: receiverId, user_id_to: id }
                ]
            }}
        ).catch(()=>{
            throw new HttpException("Не удалось получить сообщения",HttpStatus.BAD_GATEWAY)
        })
    }
}