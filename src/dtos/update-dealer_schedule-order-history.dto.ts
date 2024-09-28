import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerScheduleOrderHistoryDto } from './create-dealer_schedule-order-history.dto';

export class UpdateDealerScheduleOrderHistoryDto extends PartialType(CreateDealerScheduleOrderHistoryDto) {}
