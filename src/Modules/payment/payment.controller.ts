import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Payment from 'src/entities/payment.entity';
import { CreatePaymentDto } from 'src/dtos/create-payement.dto';


@Controller()
export class PaymentController {
    constructor(
        private readonly paymentService:PaymentService
    ){}
   @Post()
   async create( paymentDto:CreatePaymentDto,@Body() id:string){
      return this.paymentService.createPayment(paymentDto,id)
   }

}
