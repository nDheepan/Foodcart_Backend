import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerDto } from './create-dealer_detail.dto';
export class UpdateDealerDetailDto extends PartialType(CreateDealerDto) {}
