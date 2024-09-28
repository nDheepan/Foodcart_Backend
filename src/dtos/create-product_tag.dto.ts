import { IsNotEmpty, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";

export class CreateProductTagDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    dealer:CreateDealerDto;
}
