import { Module, forwardRef } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { OrderManagementController } from './order-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderManagement from '../../../entities/order-management.entity';
import { DealerOrderNotificationModule } from 'src/Modules/Dealer/dealer_order_notification/dealer_order_notification.module';
import { AgentOrdernotificationModule } from 'src/Modules/delivery_agent/agent_ordernotification/agent_ordernotification.module';
import { NotificationsModule } from 'src/Modules/notifications/notifications.module';

@Module({
  imports:[forwardRef(()=>DealerOrderNotificationModule),forwardRef(() =>NotificationsModule),TypeOrmModule.forFeature([OrderManagement])],
  controllers: [OrderManagementController],
  providers: [OrderManagementService],
  exports:[OrderManagementService]
})
export class OrderManagementModule  {
  
}
