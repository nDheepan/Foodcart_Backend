import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerStatusDto } from './create-dealer_status.dto';

export class UpdateDealerStatusDto extends PartialType(CreateDealerStatusDto) {}
