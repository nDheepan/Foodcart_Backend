import { Module } from '@nestjs/common';
import { ProductRatingService } from './product_rating.service';
import { ProductRatingController } from './product_rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRating } from '../../../entities/product_rating.entity';
import { DealerProductsModule } from '../dealer_products/dealer_products.module';

@Module({
  imports:[DealerProductsModule,TypeOrmModule.forFeature([ProductRating])],
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
  exports:[ProductRatingService]
})
export class ProductRatingModule {}
