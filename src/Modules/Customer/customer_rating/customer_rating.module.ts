import { Module } from '@nestjs/common';
import { CustomerRatingService } from './customer_rating.service';
import { CustomerRatingController } from './customer_rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from 'src/entities/rating.entity';
import { RatingModule } from 'src/Modules/rating/rating.module';
import { ProductRatingModule } from 'src/Modules/Dealer/product_rating/product_rating.module';

@Module({
  imports:[TypeOrmModule.forFeature([Rating]),RatingModule,ProductRatingModule],
  providers: [CustomerRatingService],
  controllers: [CustomerRatingController]
})
export class CustomerRatingModule {}
