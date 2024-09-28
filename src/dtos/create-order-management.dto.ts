import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";
import { CreateCustomerDetailDto } from "./customer-detail.dto";
import { CreateAgentDto } from "./create-agent.dto";
import Payment from "src/entities/payment.entity";

export class CreateOrderManagementDto {

   @IsString()
   @IsOptional()
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
   
   @IsOptional()
   @IsString()
   deliver_to:string;

   @IsOptional()
   @IsString()
   schedule_date:string

   @IsOptional()
   @IsString()
   schedule_time:string

   @IsOptional()
   @IsBoolean()
   preorder:boolean;

   @IsOptional()
   @IsString()
   order_instruction:string;

   @IsOptional()
   @IsString()
   cancelledBy:string;

   @IsOptional()
   @IsBoolean()
   cancellation:boolean;
 
   @IsOptional()
   dealer:CreateDealerDto;

   @IsOptional()
   @IsNumber()
   preparation_time:number;

   @IsOptional()
   user:CreateCustomerDetailDto;

   @IsOptional()
   agent:CreateAgentDto;  
   
   @IsOptional()
   payment:Payment

   
}
