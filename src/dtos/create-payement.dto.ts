import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateOrderManagementDto } from "./create-order-management.dto";

export class CreatePaymentDto{
    @IsNotEmpty()
    @IsString()
     payment_method:string
    
    @IsNotEmpty()
    @IsNumber()
      amount:number
    
    @IsNotEmpty()
    @IsString()
      payment_status:string
    
    @IsNotEmpty()
    @IsDate()
       created_at:Date  
    
    @IsNotEmpty()
    @IsDate()
       updated_at:Date 
    
    @IsOptional()
      order:CreateOrderManagementDto   
}