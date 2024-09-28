import { Module, forwardRef } from '@nestjs/common';
import { DealerProductsService } from './dealer_products.service';
import { DealerProductsController } from './dealer_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import DealerMenu from '../../../entities/dealer_product.entity';
import { ProductRatingModule } from '../product_rating/product_rating.module';
import { Category } from '../../../entities/category.entity';
import { CategoryModule } from '../category/category.module';
import { ProductAddOnsModule } from '../product_add-ons/product_add-ons.module';
import { ProductAddOn } from 'src/entities/product_add-on.entity';
import { ProductsIngredientsModule } from '../products_ingredients/products_ingredients.module';
import { ProductTagsModule } from '../product_tags/product_tags.module';

@Module({
  imports:[CategoryModule,TypeOrmModule.forFeature([DealerMenu]),
  forwardRef(()=>ProductAddOnsModule),
  forwardRef(()=>ProductsIngredientsModule),
  forwardRef(()=>ProductTagsModule)
],
  controllers: [DealerProductsController],
  providers: [DealerProductsService],
  exports:[DealerProductsService]
})
export class DealerProductsModule {}
