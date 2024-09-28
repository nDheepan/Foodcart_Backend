import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCustomizationDto } from './create-product_customization.dto';

export class UpdateProductCustomizationDto extends PartialType(CreateProductCustomizationDto) {}
