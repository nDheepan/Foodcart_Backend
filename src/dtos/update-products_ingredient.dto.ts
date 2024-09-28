import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsIngredientDto } from './create-products_ingredient.dto';

export class UpdateProductsIngredientDto extends PartialType(CreateProductsIngredientDto) {}
