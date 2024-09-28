import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "src/dtos/create-dealer_detail.dto";
import { CreateCustomerDetailDto } from "./customer-detail.dto";
import { CreateOrderManagementDto } from "./create-order-management.dto";

export class CreateRatingDto {

    @IsNumber()
    dealer_star:number;

    @IsString()
    comments:string;

    @IsString()
    complient:string;
    
    @IsOptional()
    dealer:CreateDealerDto;

    @IsOptional()
    user:CreateCustomerDetailDto;

    @IsOptional()
    order:CreateOrderManagementDto;
     


}
