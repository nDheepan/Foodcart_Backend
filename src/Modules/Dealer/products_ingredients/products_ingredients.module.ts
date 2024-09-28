import { Module } from '@nestjs/common';
import { ProductsIngredientsService } from './products_ingredients.service';
import { ProductsIngredientsController } from './products_ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsIngredient } from 'src/entities/products_ingredient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductsIngredient])],
  controllers: [ProductsIngredientsController],
  providers: [ProductsIngredientsService],
  exports:[ProductsIngredientsService]
})
export class ProductsIngredientsModule {}
