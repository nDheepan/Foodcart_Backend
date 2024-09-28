import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateAdminInfoDto } from "src/dtos/create-admin_info.dto";
import { CreateDealerDto } from "src/dtos/create-dealer_detail.dto";
export class CreateAdminNotificationDto {


    @IsNotEmpty()
    @IsString()
    title:string;


    @IsNotEmpty()
    @IsString()
    message:string;

    @IsOptional()
    @IsDate()
    created_at:Date;
   
    dealer:CreateDealerDto;

    admin:CreateAdminInfoDto;



}
