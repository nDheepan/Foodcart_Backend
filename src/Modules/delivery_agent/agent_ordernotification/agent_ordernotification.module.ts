import { Module, forwardRef } from '@nestjs/common';
import { AgentOrdernotificationService } from './agent_ordernotification.service';
import { AgentOrdernotificationController } from './agent_ordernotification.controller';
import { OrderManagementModule } from 'src/Modules/orders/order-management/order-management.module';
import { NotificationsModule } from 'src/Modules/notifications/notifications.module';

@Module({
  imports:[forwardRef(()=>OrderManagementModule),forwardRef(() =>NotificationsModule)],
  controllers: [AgentOrdernotificationController],
  providers: [AgentOrdernotificationService,AgentOrdernotificationController],
  exports:[AgentOrdernotificationService,AgentOrdernotificationController]
})
export class AgentOrdernotificationModule {}
