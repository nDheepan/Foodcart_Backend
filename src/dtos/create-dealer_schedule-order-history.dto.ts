import { IsOptional, IsString } from "class-validator";

export class CreateDealerScheduleOrderHistoryDto {

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
