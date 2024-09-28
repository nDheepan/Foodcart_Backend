import { BadRequestException, Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { CreateDealerOrderNotificationDto } from './dto/create-dealer_order_notification.dto';
import { UpdateDealerOrderNotificationDto } from './dto/update-dealer_order_notification.dto';
import { OrderManagementService } from 'src/Modules/orders/order-management/order-management.service';
import { CreateOrderManagementDto } from 'src/dtos/create-order-management.dto';
import e from 'express';
import { NotificationsService } from 'src/Modules/notifications/notifications.service';
import { Role } from 'src/enum/role.enum';

@Injectable()

export class DealerOrderNotificationService {
constructor(private readonly orderService:OrderManagementService,
      private readonly notificationService:NotificationsService
   ){} 


async orderAccept(orderid:string,dealerid:any,data:CreateDealerOrderNotificationDto,orderdata:CreateOrderManagementDto){

  const {status} = data;
 let id
  if(status == true){
     orderdata.dealer = dealerid;
     const orderAssign = await this.orderService.assignOrder(orderid,orderdata);
     await this.notificationService.sendNotification(
         'Order Confirmed',`Your order ${orderid} has been confirmed. We're preparing your delicious meal now`,Role.USER,id)
     return orderAssign;
  }
  else{
      
  }
  
 }  

 async orderNotify(orderid:string,dealerid:string,userid:string){
  const userOrders = await this.orderService.getuserPOrders(userid,dealerid);
  const result = await this.orderService.getorder(orderid);
  const orders =parseInt( userOrders.result) + 1;
  console.log(orders)
  await this.notificationService.sendNotification('Order Arrived','New order is coming ',Role.DEALER,dealerid)
  if(userOrders && result){
   return {message:"order details found",result,orders}

  }
  else{
    throw new BadRequestException()
  }

  
 }

 async AgentorderNotify(orderid:string,agentid:string){
   const result = await this.orderService.getorder(orderid);
   await this.notificationService.sendNotification('Order Arrived','New order is coming ',Role.AGENT,agentid)
   if(result){
    return {message:"order details found",result}
   }
   else{
     throw new BadRequestException()
   }
 
   
  }

 
 
   
  
 
}
