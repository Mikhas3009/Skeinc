import { IsString,IsNotEmpty} from 'class-validator'

export class CreateCompanyDto{
    @IsNotEmpty({message:"company_name cannot be enmpty"})
    @IsString()
    company_name:string;

    @IsString()
    @IsNotEmpty({message:"cannot be enmpty"})
    company_address:string;

    @IsString()
    @IsNotEmpty({message:"cannot be enmpty"})
    company_email:string;

    @IsString()
    @IsNotEmpty({message:"cannot be enmpty"})
    company_phone:string;

    @IsString()
    @IsNotEmpty({message:"cannot be enmpty"})
    code:string;
}