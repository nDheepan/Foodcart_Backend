import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateDealerOrderNotificationDto {
    
    @IsOptional()
    @IsNumber()
    orderid:number;
     
    @IsOptional()
    @IsBoolean()
    status:boolean;


}
