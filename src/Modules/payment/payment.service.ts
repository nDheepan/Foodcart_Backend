import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from 'src/dtos/create-payement.dto';
import Payment from 'src/entities/payment.entity';
import { Method, Status } from 'src/enum/payment.mehod.enum';
import { Repository } from 'typeorm';
import { OrderManagementService } from '../orders/order-management/order-management.service';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
          private paymentRepository:Repository<Payment>,
          private ordeService:OrderManagementService
    ){}
async createPayment(paymentDto:CreatePaymentDto,id:string) {
  paymentDto.payment_status="pending"
  paymentDto.payment_method="creditcard"
  
     const order =await this.ordeService.findOne(id)
       paymentDto.amount=order.total,
       paymentDto.order=order.id
  try {
    const payment = await this.paymentRepository.create(paymentDto);

    console.log('Payment created:', payment);
  } catch (error) {
    console.error('Error creating payment:', error);
  }
}
}