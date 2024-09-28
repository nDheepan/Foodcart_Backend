import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleOrderManagementDto } from './create-schedule_order-management.dto';

export class UpdateScheduleOrderManagementDto extends PartialType(CreateScheduleOrderManagementDto) {}
