import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";
import { CreateAdminInfoDto } from "src/dtos/create-admin_info.dto";

export class CreateDealerToAdminComplientDto {

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
