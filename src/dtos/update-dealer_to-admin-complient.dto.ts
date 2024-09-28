import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerToAdminComplientDto } from './create-dealer_to-admin-complient.dto';

export class UpdateDealerToAdminComplientDto extends PartialType(CreateDealerToAdminComplientDto) {}
