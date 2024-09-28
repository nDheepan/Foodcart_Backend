import { IsBIC, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateDealerSettingDto {
     
    @IsNotEmpty()
    @IsString()
    reason:string;

    @IsNotEmpty()
    @IsNumber()
    timetake:number;

    @IsOptional()
    @IsDate()
    created_at:Date;

    dealer:CreateDealerDto;


    

}
