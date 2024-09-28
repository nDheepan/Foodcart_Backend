import { Module } from '@nestjs/common';
import { PromoOffersService } from './promo-offers.service';
import { PromoOffersController } from './promo-offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoOffers } from '../../../entities/promo-offer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PromoOffers])],
  controllers: [PromoOffersController],
  providers: [PromoOffersService],
})
export class PromoOffersModule {}
