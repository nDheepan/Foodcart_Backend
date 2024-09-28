import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerManagestaffDto } from './create-dealer_managestaff.dto';

export class UpdateDealerManagestaffDto extends PartialType(CreateDealerManagestaffDto) {}
