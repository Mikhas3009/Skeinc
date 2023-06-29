import { Module } from '@nestjs/common';
import { FinancesController } from './finances.controller';
import { FinancesService } from './finances.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinanceModel } from 'src/models/DB-sequelize-models/modelFinances';
import { AuthModule } from 'src/auth/auth.module';
import { PersonalCabinetModule } from 'src/personal-cabinet/personal-cabinet.module';

@Module({
    imports:[
        SequelizeModule.forFeature([
          FinanceModel
        ]),
        AuthModule,
        PersonalCabinetModule
    ],
    controllers: [FinancesController],
    providers: [FinancesService],
    exports:[FinancesService]
})
export class FinancesModule {}
