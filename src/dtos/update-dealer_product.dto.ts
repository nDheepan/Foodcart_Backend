import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerProductDto } from './create-dealer_product.dto';

export class UpdateDealerProductDto extends PartialType(CreateDealerProductDto) {}
