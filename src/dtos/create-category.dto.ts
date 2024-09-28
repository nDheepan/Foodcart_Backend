import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateDealerProductDto } from "./create-dealer_product.dto";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Type } from "class-transformer";

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    type: string;


    @IsNotEmpty()
    @ApiProperty({type: () => [String]})
    @IsArray()
    @Type(() => String)
    
    category: string[];

    @IsNotEmpty()
    @ApiProperty({type: () => [String]})
    @IsArray()
    @Type(() => String)
    
    meal_type: string[];

    @IsNotEmpty()
    @IsString()
    preference: string;

    @IsNotEmpty()
    @ApiProperty({type: () => [String]})
    @IsArray()
    @Type(() => String)
    cuisine: string[];

    dealermenu:CreateDealerProductDto;
}
