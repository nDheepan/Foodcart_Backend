import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, isDate } from "class-validator";
import { OrderItem } from "../entities/order-item.entity";
import { CreateOrderManagementDto } from "./create-order-management.dto";
import { CreateDealerProductDto } from "src/dtos/create-dealer_product.dto";
import { CreateScheduleOrderManagementDto } from "src/dtos/create-schedule_order-management.dto";

export class CreateOrderItemDto {

    @IsNotEmpty()
    @IsNumber()
    item_qty:number;
    
    @IsOptional()
    product:CreateDealerProductDto;

    @IsOptional()
    order:CreateOrderManagementDto;  
    
    @IsOptional()
    scheduleOrder:CreateScheduleOrderManagementDto;
}
