import { Module } from '@nestjs/common';
import { ScheduleOrderManagementService } from './schedule_order-management.service';
import { ScheduleOrderManagementController } from './schedule_order-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleOrderManagement } from '../../../entities/schedule_order-management.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ScheduleOrderManagement])],
  controllers: [ScheduleOrderManagementController],
  providers: [ScheduleOrderManagementService],
})
export class ScheduleOrderManagementModule {}
