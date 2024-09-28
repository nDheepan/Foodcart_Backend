import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerPayoutDto } from './create-dealer_payout.dto';

export class UpdateDealerPayoutDto extends PartialType(CreateDealerPayoutDto) {}
