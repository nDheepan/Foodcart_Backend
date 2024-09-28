import { Module, forwardRef } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '../../../entities/order-item.entity';
import { DealerProductsModule } from 'src/Modules/Dealer/dealer_products/dealer_products.module';
import { OrderManagementModule } from '../order-management/order-management.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrderItem]),forwardRef(()=>DealerProductsModule),forwardRef(()=>OrderManagementModule)],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports:[OrderItemsService]
})
export class OrderItemsModule {}
