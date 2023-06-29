import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/DB-sequelize-models/modelUser';
import { CompanyModel } from '../models/DB-sequelize-models/modelCompany';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectModel(UserModel)private userDB:typeof UserModel,//инъекция модели пользователя(сотрудника)
        @InjectModel(CompanyModel)private companyDB:typeof CompanyModel,//инъекция модели кампании
        private tokenService:JwtService,
        private readonly mailService:MailerService
    ){}

   async addUser(req:Request) {
      const{code}=req.body;
      let userReq:{role:string,company:string,company_id:number,fio,email,phone,login,password,confirm_password}=req.body;
      if(userReq.confirm_password!=userReq.password){
        throw new Error('Пароли не совпадают');
    }
      const companyForCurrentUser = await this.companyDB.findOne({where:{code}});
      if(!companyForCurrentUser){
         throw new Error('Компания не найдена')
      }
      userReq.role="Сотрудник";
      userReq.company=companyForCurrentUser.code;
      userReq.company_id=companyForCurrentUser.id;
      const user = await this.userDB.create(userReq)
      if(!user){
          throw new Error('Пользователь уже зарегестрирован')
      };
      return await this.generateToken(user,companyForCurrentUser.company_name,companyForCurrentUser.id);
   }
    //Добавление администратора
    async addAdmin(req:Request) {
        const company:{company_name,company_address,company_phone,code}=req.body;
        let admin:{role:string,company:string,fio,email,phone,login,password,confirm_password}=req.body;
        console.log(admin.confirm_password);
        if(admin.confirm_password!=admin.password){
            throw new Error('Пароли не совпадают');
        }
        admin.role="Администратор";
        admin.company=req.body.code;
        const user = await this.userDB.create(admin);
        if(!user){
            throw new Error('Пользователь уже зарегестрирован')
        }
        const {code , id}=(await this.companyDB.create(company));
        if(!code){
            throw new Error('Компания уже зарегестрирована')
        }
        await this.userDB.update({
            company_id: id,
            },
            {
            where:{id:user.id}}
            )
        admin.role="Администратор";
        admin.company=code;
        return await this.generateToken(user,company.company_name,id);
    }
    // Авторизация
    async authorization(req:Request) {
        const {login,password} = req.body;
        const user = await this.userDB.findOne({where: {login}})
                      .catch(()=>{throw new HttpException('Неккоректные данные',HttpStatus.BAD_REQUEST)});
        if(!user){
            throw new Error('Пользователь не найден');
        }
        if(user.login!=login||user.password!=password){
            throw new Error('Неверный логин или пароль');
        }
        const code=user.company;
        const {company_name,id}= ((await this.companyDB.findOne({where: {code}})));
        const token =await this.generateToken(user,company_name,id);
        const role = user.role;
        return {token,role};
    }

   async sendMailPass(req:Request) {
       const {email}=req.body;
       const user = await this.userDB.findOne({where: {email}});
       if(!user){
           throw new Error('Пользователь с таким адресом не найден')
       }
       await this.mailService.sendMail({
           to: `${email}`,
           from: `ske3y@mail.ru`||process.env.SERVER_EMAIL,
           subject: `Восстановление пароля`,
           text:`Здравствуйте, ${user.fio}!\nВаш логин: ${user.login}\nВаш пароль:${user.password}`
       }).catch((err)=>{throw err})
       return {requestSuccess:"Пароль от аккаунта выслан на почту"}
   }

   async destroyAdmin() {
    await this.userDB.destroy({where:{company_id:null}})
   }

    decodeToken(token:string){
    return JSON.parse(JSON.stringify(this.tokenService.decode(token)));
   }

   private async generateToken(user:UserModel,company:string,id:number){// генерация токена для cookie
       console.log(company);
       const tokenData={
          email:user.email,
          name:user.fio,
          role:user.role,
          id:user.id,
          company:user.company,
          companyName:company,
          companyID:id}
      return this.tokenService.sign(tokenData,{expiresIn:1000*60*60*24*60});
   }
}