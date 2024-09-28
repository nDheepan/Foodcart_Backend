import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleOrderPayoutDto } from './create-schedule-order_payout.dto';

export class UpdateScheduleOrderPayoutDto extends PartialType(CreateScheduleOrderPayoutDto) {}
