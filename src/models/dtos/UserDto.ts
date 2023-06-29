import { IsNotEmpty, IsString, Length} from 'class-validator'

export class CreateUserDto {

  @Length(1)
  @IsNotEmpty({message:"cannot be enmpty"})
  @IsString()
  fio: string

  @Length(1)
  @IsNotEmpty({message:"cannot be enmpty"})
  @IsString()
  login: string

  @IsString()
  @Length(1)
  @IsNotEmpty({message:"cannot be enmpty"})
  password: string

  @Length(1)
  @IsString()
  @IsNotEmpty({message:"cannot be enmpty"})
  phone: string

  @Length(1)
  @IsString()
  @IsNotEmpty({message:"cannot be enmpty"})
  email: string
}