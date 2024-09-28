import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerProductDto } from "./create-dealer_product.dto";
import { Transform } from "class-transformer";
import { CreateDealerDto } from "./create-dealer_detail.dto";

export class CreateProductAddOnDto {
    
    @IsOptional()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>{
    return Number(value)
    })
    price:number;

    dealer:CreateDealerDto;


}
