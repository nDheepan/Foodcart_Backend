import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerProfileDto } from './create-dealer_profile.dto';

export class UpdateDealerProfileDto extends PartialType(CreateDealerProfileDto) {}
