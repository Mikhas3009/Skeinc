// Импорты
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { AuthService } from 'src/auth/auth.service';
import { NewsModel } from 'src/models/DB-sequelize-models/modelNews';

@Injectable()
export class NewsService {
    // Инъекция моделей
    constructor(
        @InjectModel(NewsModel)private newsDB:typeof NewsModel,
        private authService:AuthService,
    ){}
    // Удаление новости
    async deleteNews(req: Request) {
      const idNews:number[]=[];
      req.body.forEach(async elem=> {
        idNews.push(elem[0]);
      });  
      const destroyed= await this.newsDB.destroy({where:{news_id:{[Op.in]:idNews}}})
    }
    // Добавление новости
    async addNews(req:Request) {
      const {NewNewsName, NewNewsDecription,NewNewsDate}=req.body;
      const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
      await this.newsDB.create({
        news_name:NewNewsName,
        news_description:NewNewsDecription,
        news_date:NewNewsDate,
        company_id:companyID
        })
        .catch(err=>{
          throw err;
      })
    }
    // Получение новостей
    async getNews(req: Request) {
      const company_id=this.authService.decodeToken(req.cookies.AccsesToken).companyID;
      return await this.newsDB.findAll({where:{company_id}}).catch(err=>{
        throw err;
      });
    }
}