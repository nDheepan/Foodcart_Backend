import { Module } from '@nestjs/common';
import { ManageOutletService } from './manage-outlet.service';
import { ManageOutletController } from './manage-outlet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
import { RestaurantSlotTimingModule } from '../restaurant_slot-timing/restaurant_slot-timing.module';

@Module({
  imports:[dealerDetailsModule,RestaurantSlotTimingModule],
  controllers: [ManageOutletController],
  providers: [ManageOutletService],
})
export class ManageOutletModule {}
