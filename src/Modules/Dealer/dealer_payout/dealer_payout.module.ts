import { Module } from '@nestjs/common';
import { DealerPayoutService } from './dealer_payout.service';
import { DealerPayoutController } from './dealer_payout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dealer_Entity])],
  controllers: [DealerPayoutController],
  providers: [DealerPayoutService],
})
export class DealerPayoutModule {}
