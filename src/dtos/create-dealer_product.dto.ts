import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";
import { CreateOrderItemDto } from "src/dtos/create-order-item.dto";
import { CreateProductAddOnDto } from "./create-product_add-on.dto";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { CreateProductsIngredientDto } from "./create-products_ingredient.dto";
import { CreateProductTagDto } from "./create-product_tag.dto";
import { Transform } from "class-transformer";

export class CreateDealerProductDto {
   
    
    @IsNotEmpty()
    @IsString()
    name:string;  

    @IsNotEmpty()
    @IsString()
    desc:string;

    
  

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>{
        return Number(value)
    })
    price:number;


   
    @IsBoolean()
    @IsNotEmpty()
    is_available: boolean = true;

    @IsOptional()
    @IsString()
    images:string;

    @IsOptional()
    @IsString()
    shorts:string;

    @IsNotEmpty()
    @IsString()
    spicylevel:string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>{
        return Number(value)
    })
    servepeople:number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>{
        return Number(value)
    })
    gst:number;


    @IsOptional()
    @IsNumber()
    packagecharge:number;
     
    @IsOptional()
    @IsNumber()
    ratings:number
   
    @IsOptional()
    dealer:CreateDealerDto;
        
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1) 
    @Transform(({ value }) => {
        if (typeof value === 'string') {
          return value.split(',').map(Number);
        }
        return value;
      })   
    ingredientIds: number[]; 
    

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1) 
    @Transform(({ value }) => {
        if (typeof value === 'string') {
          return value.split(',').map(Number);
        }
        return value;
      })    
    tagIds: number[];
    
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1) 
    @Transform(({ value }) => {
        if (typeof value === 'string') {
          return value.split(',').map(Number);
        }
        return value;
      })    addonIds: number[]; 


      @IsOptional()
      @IsArray()
      @ArrayMinSize(1) 
      @Transform(({ value }) => {
          if (typeof value === 'string') {
            return value.split(',').map(Number);
          }
          return value;
        })    customizationIds: number[]; 
    }
