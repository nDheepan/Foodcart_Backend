import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAgentOrdernotificationDto {

    @IsOptional()
    @IsBoolean()
    status:boolean;

}
