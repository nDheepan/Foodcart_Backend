import { PartialType } from '@nestjs/mapped-types';
import { CreateProductListingDto } from './create-product_listing.dto';

export class UpdateProductListingDto extends PartialType(CreateProductListingDto) {}
