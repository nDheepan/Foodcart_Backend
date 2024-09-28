import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreatePreOrderManagementDto {

    @IsOptional()
    @IsBoolean()
    preorder:boolean;


    @IsOptional()
    @IsString()
    schedule_date:string;


    @IsOptional()
    @IsString()
    schedule_time:string;

}
