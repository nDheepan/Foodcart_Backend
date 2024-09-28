import { Module } from '@nestjs/common';
import { UserOrderHistoryService } from './user_order_history.service';
import { UserOrderHistoryController } from './user_order_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderManagement from 'src/entities/order-management.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderManagement])],
  providers: [UserOrderHistoryService],
  controllers: [UserOrderHistoryController]
})
export class UserOrderHistoryModule {}
