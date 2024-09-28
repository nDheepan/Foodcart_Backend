import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateRatingDto } from "src/dtos/create-rating.dto";
import { CreateDealerProductDto } from "./create-dealer_product.dto";

export class createProductRatingDto {

    @IsNumber()
    product_star:number;

    @IsString()
    comments:string;

    @IsOptional()
    rating:CreateRatingDto;

    @IsOptional()
    product:CreateDealerProductDto;

}
