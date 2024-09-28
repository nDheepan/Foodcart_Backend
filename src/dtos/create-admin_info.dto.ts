import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAdminInfoDto {

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsNumber()
    mobile:number;

    @IsNotEmpty()
    @IsEmail()
    email:string;

}
