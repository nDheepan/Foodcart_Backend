import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateDealerDto } from "src/dtos/create-dealer_detail.dto";
import Dealer_Entity from "src/entities/dealer_detail.entity";

export class CreatePromoOfferDto {


    @IsString()
    @IsNotEmpty()
    provider:string;

    @IsString()
    @IsNotEmpty()
    promoname:string;

    @IsString()
    @IsNotEmpty()
    coupon_code:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    @IsString()
    instruction:string;
    

    @IsOptional()
    dealer:CreateDealerDto;
}
