import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Request } from "express";
import { Op } from "sequelize";
import { AuthService } from "src/auth/auth.service";
import { TMFilterModel } from "src/models/DB-sequelize-models/modelFilter";
import { CreateFilterDto } from "src/models/dtos/FilterDto";

@Injectable()
export class CompanyFilterService{
    //Инъекция моделей
    constructor(
        @InjectModel(TMFilterModel)private filterDB:typeof TMFilterModel,
        private authService:AuthService
    ){}
    // Добавление фильтра
    async addFilter(filter:CreateFilterDto){
        const {TimeManagerFilterCompanyId,TimeManagerFilterName}=filter;
        await this.filterDB.create({
            company_id:TimeManagerFilterCompanyId,
            filter_name:TimeManagerFilterName
        }).catch(()=>{
            throw new HttpException("Не удалось добавить фильтр",HttpStatus.BAD_GATEWAY)
        })
    }
    // Получение фильтров
    async getFilters(req:Request){
        const {companyID}=this.authService.decodeToken(req.cookies.AccsesToken);
        return await this.filterDB.findAll({where:{company_id:companyID}});
    }
    // Удаление фильтров
    async deleteFilters(req:Request){
        const filtersId:number[]=[];
        req.body.forEach(({TimeManagerFilterId})=>{
            filtersId.push(TimeManagerFilterId)
        })
        await this.filterDB.destroy({where:{filter_id:{[Op.in]:filtersId}}})
          .catch(()=>{throw new HttpException('Не удалось выполнить удаление',HttpStatus.BAD_GATEWAY)})
    }
}