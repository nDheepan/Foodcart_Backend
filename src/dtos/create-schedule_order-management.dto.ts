import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";

export class CreateScheduleOrderManagementDto {

    @IsOptional()
    @IsString()
    deliverystatus:string;
 
    @IsOptional()
    @IsNumber()
    total:number;
 
    @IsOptional()
    @IsDate()
    created_at:Date;

    @IsOptional()
    @IsDate()
    modified_at:Date;
 
    @IsOptional()
    @IsDate()
    cancelled_at:Date;

    @IsNotEmpty()
    @IsString()
    deliver_to:string;
 
    @IsNotEmpty()
    @IsString()
    delivery_time:string;
 
    
    @IsNotEmpty()
    @IsString()
    delivery_date:string;
 
    @IsOptional()
    @IsString()
    delivery_status:string;

    @IsOptional()
    @IsString()
    order_instruction:string;
  
    @IsOptional()
    dealer:CreateDealerDto;
 
    /*@IsOptional()
    user:CreateUserDto;
    */
}
