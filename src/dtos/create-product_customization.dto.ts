import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";

export class CreateProductCustomizationDto {

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
