import { Module } from '@nestjs/common';
import { RestaurantSlotTimingService } from './restaurant_slot-timing.service';
import { RestaurantSlotTimingController } from './restaurant_slot-timing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSlotTiming } from 'src/entities/restaurant_slot-timing.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RestaurantSlotTiming])],
  controllers: [RestaurantSlotTimingController],
  providers: [RestaurantSlotTimingService],
  exports:[RestaurantSlotTimingService]
})
export class RestaurantSlotTimingModule {}
