import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSubcategoryDto } from './create-product_subcategory.dto';

export class UpdateProductSubcategoryDto extends PartialType(CreateProductSubcategoryDto) {}
