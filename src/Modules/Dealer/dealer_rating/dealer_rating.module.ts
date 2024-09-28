import { Module } from '@nestjs/common';
import { DealerRatingService } from './dealer_rating.service';
import { DealerRatingController } from './dealer_rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { dealerAuthModule } from '../dealer_auth/dealer_auth.module';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
import { RatingModule } from 'src/Modules/rating/rating.module';

@Module({
  imports:[dealerDetailsModule,RatingModule,TypeOrmModule.forFeature([Dealer_Entity])],
  controllers: [DealerRatingController],
  providers: [DealerRatingService],
  exports:[DealerRatingService]
})
export class DealerRatingModule {}
