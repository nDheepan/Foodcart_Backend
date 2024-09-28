import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerDetailsController } from './dealer_details.controller';
import { DealerDetailsService } from './dealer_details.service';
import Dealer from '../../../entities/dealer_detail.entity';
import {  DealerStrategy,  } from 'src/strategies/jwt.strtegy';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { DealerRatingModule } from '../dealer_rating/dealer_rating.module';
import { RestaurantSlotTimingModule } from '../restaurant_slot-timing/restaurant_slot-timing.module';

@Module({
  imports:[TypeOrmModule.forFeature([Dealer_Entity]),RestaurantSlotTimingModule],
  controllers: [DealerDetailsController],
  providers: [DealerDetailsService],
  exports:[DealerDetailsService]
})
export class dealerDetailsModule {}
