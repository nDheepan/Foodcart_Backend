import { IsOptional, IsString } from "class-validator";

export class createOrderHistoryDto{

    @IsOptional()
    @IsString()
    date:string;

    @IsOptional()
    @IsString()
    start:string;

    @IsOptional()
    @IsString()
    end:string;





}