import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Payment from 'src/entities/payment.entity';
import { OrderManagementModule } from '../orders/order-management/order-management.module';

@Module({
  imports:[TypeOrmModule.forFeature([Payment]),OrderManagementModule],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
