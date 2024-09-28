import { Module } from '@nestjs/common';
import { DealerOrderHistoryService } from './dealer_order_history.service';
import { DealerOrderHistoryController } from './dealer_order_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dealer_Entity])],
  controllers: [DealerOrderHistoryController],
  providers: [DealerOrderHistoryService],
})
export class DealerOrderHistoryModule {}
