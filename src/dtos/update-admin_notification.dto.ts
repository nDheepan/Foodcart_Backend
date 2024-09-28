import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminNotificationDto } from './create-admin_notification.dto';
export class UpdateAdminNotificationDto extends PartialType(CreateAdminNotificationDto) {}
