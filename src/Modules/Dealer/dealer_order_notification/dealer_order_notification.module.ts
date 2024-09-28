import { Module, forwardRef } from '@nestjs/common';
import { DealerOrderNotificationService } from './dealer_order_notification.service';
import { DealerOrderNotificationController } from './dealer_order_notification.controller';
import { OrderManagementModule } from 'src/Modules/orders/order-management/order-management.module';
import { AgentModule } from 'src/Modules/delivery_agent/agent/agent.module';
import { AgentOrdernotificationModule } from 'src/Modules/delivery_agent/agent_ordernotification/agent_ordernotification.module';
import { OrderItemsModule } from 'src/Modules/orders/order-items/order-items.module';
import { NotificationsModule } from 'src/Modules/notifications/notifications.module';

@Module({
  imports:[forwardRef(()=>OrderManagementModule),forwardRef(()=>AgentOrdernotificationModule),forwardRef(()=>OrderItemsModule),forwardRef(()=>NotificationsModule)],
  controllers: [DealerOrderNotificationController,DealerOrderNotificationController],
  providers: [DealerOrderNotificationService,DealerOrderNotificationController],
  exports:[DealerOrderNotificationService,DealerOrderNotificationController]
})
export class DealerOrderNotificationModule {}
