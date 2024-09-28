import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerAuthDto } from './create-dealer_auth.dto';

export class UpdateDealerAuthDto extends PartialType(CreateDealerAuthDto) {}
