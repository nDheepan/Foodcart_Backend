import { Module, forwardRef } from '@nestjs/common';
import { CustomerOrderService } from './customer_order.service';
import { CustomerOrderController } from './customer_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/order-item.entity';
import OrderManagement from 'src/entities/order-management.entity';
import { User } from 'src/entities/customer_detail.entity';
import { OrderManagementModule } from 'src/Modules/orders/order-management/order-management.module';
import { OrderItemsModule } from 'src/Modules/orders/order-items/order-items.module';
import { DealerProductsModule } from 'src/Modules/Dealer/dealer_products/dealer_products.module';
import { dealerDetailsModule } from 'src/Modules/Dealer/dealer_details/dealer_details.module';
import { NotificationsModule } from 'src/Modules/notifications/notifications.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrderManagement,User,OrderItem]),
        forwardRef(()=> OrderManagementModule),forwardRef(()=>OrderItemsModule),forwardRef(()=>DealerProductsModule),
      forwardRef(()=>dealerDetailsModule),forwardRef(()=>NotificationsModule)],
  providers: [CustomerOrderService,],
  controllers: [CustomerOrderController]
})
export class CustomerOrderModule {}
