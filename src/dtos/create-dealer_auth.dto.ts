import { IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateDealerAuthDto {
  
@IsOptional()
@IsNumber()
otpcode:number;
}
