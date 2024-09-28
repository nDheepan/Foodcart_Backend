import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";

export class CreateDealerManagestaffDto {

    @IsNotEmpty()
    @IsString()
    name:string;
 

    @IsNotEmpty()
    @IsNumber()
    mobile:number;

    
    @IsOptional()
    @IsString()
    role:string;



    @IsOptional()
    @IsDate()
    created_at:Date;


    @IsOptional()
    @IsBoolean()
    is_active:boolean;


    dealer:CreateDealerDto;




}
