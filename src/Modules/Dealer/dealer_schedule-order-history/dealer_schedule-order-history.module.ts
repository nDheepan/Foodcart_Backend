import { Module } from '@nestjs/common';
import { DealerScheduleOrderHistoryService } from './dealer_schedule-order-history.service';
import { DealerScheduleOrderHistoryController } from './dealer_schedule-order-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dealer_Entity])],
  controllers: [DealerScheduleOrderHistoryController],
  providers: [DealerScheduleOrderHistoryService],
})
export class DealerScheduleOrderHistoryModule {}
