import { Body, Controller, NotFoundException, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CustomerOrderService } from './customer_order.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';

@UseGuards(jwtGuard)
@Controller()
export class CustomerOrderController {
    constructor(
        private readonly orderService:CustomerOrderService
    ){}
  
    @Post()
    async addorders(@Body() orderdata:any,@Req() req){
       return this.orderService.addOrders(orderdata,req)
    }
    @Post(':id/cancel')
    async cancelorder(@Param('id') id:number,@Req() req){
        return this.orderService.cancelOrder(id,req)
    }
    @Post(':id/reorder')
    async reorder(@Req() req, @Param('id') orderId: number) {
      try {
        const reorderedOrder = await this.orderService.reorder(req, orderId);
        return reorderedOrder;
      } catch (error) {
        throw new NotFoundException(error.message);
      }
}
}
