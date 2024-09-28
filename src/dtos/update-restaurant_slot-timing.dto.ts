import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantSlotTimingDto } from './create-restaurant_slot-timing.dto';

export class UpdateRestaurantSlotTimingDto extends PartialType(CreateRestaurantSlotTimingDto) {}
