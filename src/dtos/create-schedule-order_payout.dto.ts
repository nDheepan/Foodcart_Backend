import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateScheduleOrderPayoutDto {

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
