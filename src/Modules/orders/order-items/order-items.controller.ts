import { Controller, Get, Post, Body, Patch,Request ,Param, Delete, UseGuards, UnauthorizedException, Req, Res, HttpStatus } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from '../../../dtos/create-order-item.dto';
import { UpdateOrderItemDto } from '../../../dtos/update-order-item.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { CreateDealerProductDto } from 'src/dtos/create-dealer_product.dto';
import { Console } from 'console';
import { DealerProductsService } from 'src/Modules/Dealer/dealer_products/dealer_products.service';
import { OrderManagementService } from '../order-management/order-management.service';

@Controller()
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService,private readonly productservice:DealerProductsService,
    private readonly orderService:OrderManagementService) {}

  @Post()
 async create(@Param(":productid") productid:any,@Param(":orderid") orderid:any,@Param(":sheduleorderid") scheduleorderid:any,@Body() createOrderItemDto: CreateOrderItemDto,@Req() req : any,@Res() res:any) {
    
    
    createOrderItemDto.product = productid;
    createOrderItemDto.order = orderid;
    createOrderItemDto.scheduleOrder = scheduleorderid;
    const result = await this.orderItemsService.create(createOrderItemDto);
    if(result){res.status(HttpStatus.OK).json({result})}
    else{res.status(HttpStatus.NOT_FOUND)}
  }

  @Get(':orderid')
  async findAll(@Param('orderid') orderid:string,@Req() req : any,@Res() res:any) {
    const result = await this.orderItemsService.findAll(orderid);
    if(result){res.status(HttpStatus.OK).json({result})}
    else{res.status(HttpStatus.NOT_FOUND)}
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req : any,@Res() res:any) {
    const result = await this.orderItemsService.findOne(+id);
    if(result){res.status(HttpStatus.OK).json({result})}
    else{res.status(HttpStatus.NOT_FOUND)}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto,@Req() req : any,@Res() res:any) {
    const result =await this.orderItemsService.update(+id, updateOrderItemDto);
    if(result){res.status(HttpStatus.OK).json({result})}
    else{res.status(HttpStatus.NOT_FOUND)}
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req : any,@Res() res:any) {
    const result = await this.orderItemsService.remove(+id);
    if(result){res.status(HttpStatus.OK).json({result})}
    else{res.status(HttpStatus.NOT_FOUND)}
  }

  
}
