import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDealerStatusDto {

    @IsOptional()
    @IsBoolean()
    status:boolean;

    @IsOptional()
    @IsNumber()
    delay:number;

    @IsOptional()
    @IsString()
    schedule:string;

    @IsOptional()
    @IsBoolean()
    manual:boolean;

    @IsOptional()
    @IsNumber()
    schedule_days:number;



    

    





}
