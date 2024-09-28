import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { CustomerdetailModule } from '../Customer/customerdetail/customerdetail.module';
import { dealerDetailsModule } from '../Dealer/dealer_details/dealer_details.module';
import { AgentModule } from '../delivery_agent/agent/agent.module';

@Module({
  imports:[CustomerdetailModule,dealerDetailsModule,AgentModule],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports:[NotificationsService]
})
export class NotificationsModule {}
