import { PartialType } from '@nestjs/mapped-types';
import { createProductRatingDto } from './create-product_rating.dto';

export class UpdateProductRatingDto extends PartialType(createProductRatingDto) {}
