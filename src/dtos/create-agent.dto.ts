import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Validate } from "class-validator";
import { ValidateMobileNumber } from "src/decorators/validate";

export class CreateAgentDto {

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    address:string;

    @IsNotEmpty()
    @IsNumber()
    @Validate(ValidateMobileNumber,{message:"enter exact 10 digit mobile number"})
    mobile:number;

    @IsOptional()
    @IsString()
     fcmtoken:string

    @IsOptional()
    @IsDate()
    created_at:Date;
}
