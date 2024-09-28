import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerQueryDto } from './create-dealer_query.dto';

export class UpdateDealerQueryDto extends PartialType(CreateDealerQueryDto) {}
