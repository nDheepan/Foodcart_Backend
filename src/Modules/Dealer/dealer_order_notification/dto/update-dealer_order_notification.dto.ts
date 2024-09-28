import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerOrderNotificationDto } from './create-dealer_order_notification.dto';

export class UpdateDealerOrderNotificationDto extends PartialType(CreateDealerOrderNotificationDto) {}
