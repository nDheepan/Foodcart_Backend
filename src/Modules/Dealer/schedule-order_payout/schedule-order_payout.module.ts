import { Module } from '@nestjs/common';
import { ScheduleOrderPayoutService } from './schedule-order_payout.service';
import { ScheduleOrderPayoutController } from './schedule-order_payout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dealer_Entity])],
  controllers: [ScheduleOrderPayoutController],
  providers: [ScheduleOrderPayoutService],
})
export class ScheduleOrderPayoutModule {}
