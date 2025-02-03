import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  fullName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  userName: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password:string;
}
