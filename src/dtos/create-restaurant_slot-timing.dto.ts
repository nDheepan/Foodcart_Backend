import { IsNotEmpty, IsString } from "class-validator";
import { CreateDealerDto } from "./create-dealer_detail.dto";

export class CreateRestaurantSlotTimingDto {
    @IsNotEmpty()
    @IsString()
    from_time:string;

    @IsNotEmpty()
    @IsString()
    to_time:string;

    dealer:CreateDealerDto;
}
