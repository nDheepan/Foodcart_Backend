import { Module } from '@nestjs/common';
import { DealerStatusService } from './dealer_status.service';
import { DealerStatusController } from './dealer_status.controller';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';

@Module({
  imports:[dealerDetailsModule],
  controllers: [DealerStatusController],
  providers: [DealerStatusService],
})
export class DealerStatusModule {}
