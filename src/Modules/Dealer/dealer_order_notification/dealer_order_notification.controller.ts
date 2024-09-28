import { Controller, Get, Post, Body,Request, Patch, Param, Delete, UseGuards, Res, HttpStatus, HttpCode, Req, Query } from '@nestjs/common';
import { DealerOrderNotificationService } from './dealer_order_notification.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { OrderManagementService } from 'src/Modules/orders/order-management/order-management.service';
import { CreateDealerOrderNotificationDto } from './dto/create-dealer_order_notification.dto';
import { UpdateOrderManagementDto } from 'src/dtos/update-order-management.dto';
import * as schedule from 'node-schedule';
import { ScheduleServiceService } from 'src/services/schedule-service.service';
import { time } from 'console';
import { AgentOrdernotificationService } from 'src/Modules/delivery_agent/agent_ordernotification/agent_ordernotification.service';
import { OrderItemsService } from 'src/Modules/orders/order-items/order-items.service';
import { AgentOrdernotificationController } from 'src/Modules/delivery_agent/agent_ordernotification/agent_ordernotification.controller';
import { CreateOrderManagementDto } from 'src/dtos/create-order-management.dto';
import { Response } from 'express';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerOrderNotificationController {

  private readonly scheduleservice :ScheduleServiceService;
  constructor(private readonly dealerOrderNotificationService: DealerOrderNotificationService,
    private readonly orderManagementService:OrderManagementService ,
    private readonly agentOrderNotificationService :AgentOrdernotificationService,
    private readonly itemSerrvice : OrderItemsService,
    private readonly agentcontroller:AgentOrdernotificationController,
    ) {
      this.scheduleservice = new ScheduleServiceService();
    }

  //accept order    
  @Post("/:orderid") 
  async acceptorder(@Param('orderid') orderid:string,@Req() req,@Res() res:Response,
        @Body() dealerorderDto:CreateDealerOrderNotificationDto,@Body() orderDto:CreateOrderManagementDto):Promise<any>{ 
    const dealerid=req.user.dealerid
    const result = await this.dealerOrderNotificationService.orderAccept(orderid,dealerid,dealerorderDto,orderDto)
    console.log(result);
    if(result){
      return res.status(HttpStatus.OK).json({message:"details found successfully",Orders:result.orders})
    }
    else{
      return res.status(HttpStatus.NOT_FOUND).json({message:"details not found"})
    }
   
  }
  @Get('orderNotify/:orderid/:userid')
  async orderNotify(@Param('orderid') orderid:string,@Param('userid') userid:string,@Req() req:any,@Res() res:Response){
    const dealerid = req.user.dealerid;
    const dealernotification = await this.dealerOrderNotificationService.orderNotify(orderid,dealerid,userid);
    if(dealernotification){
      return res.status(HttpStatus.OK).json({message:"details found successfully",userOrders : dealernotification.orders,Order:dealernotification.result})
    }
    else{
      return res.status(HttpStatus.NOT_FOUND).json({message:"details not found"})
    }
  }
     
  @Get(':orderid/:agentid')
  async  AgentNotify(@Param('orderid') orderid:string,@Param('agentid') agentid:string,
  @Req() req:any,@Res() res:Response){
  
    const preorder = await this.orderManagementService.findOne(orderid);
    const s_date =  preorder.orderrepo_schedule_date;
    const s_time = preorder.orderrepo_schedule_time;

    if(preorder.orderrepo_preorder == true){
    const schedule = require('node-schedule');
    const date = this.scheduleservice.scheduleParam(s_date,s_time);
    
    const job = schedule.scheduleJob(date, function(){
      const agentNotification =  this.dealerOrderNotificationService.AgentorderNotify(orderid,agentid);
      if(agentNotification){res.status(HttpStatus.OK).json({message:"order notification send"})}
      else{
      res.status(HttpStatus.NOT_FOUND).json({messgae:"details not found"})
      }    }); 
  
  }
  
  else{
    const agentNotification = await this.dealerOrderNotificationService.AgentorderNotify(orderid,agentid);
    if(agentNotification){   res.status(HttpStatus.OK).json({message:"order notification send"})}
    else{
    res.status(HttpStatus.NOT_FOUND).json({messgae:"details not found"})
    }
  }
      
}
}

    
  


 

