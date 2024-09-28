import { Controller, Get, Post, Body, Patch,Request, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AgentOrdernotificationService } from './agent_ordernotification.service';
import { CreateAgentOrdernotificationDto } from './dto/create-agent_ordernotification.dto';
import { UpdateAgentOrdernotificationDto } from './dto/update-agent_ordernotification.dto';
import { OrderManagementService } from 'src/Modules/orders/order-management/order-management.service';
import { Response } from 'express';
import { UpdateOrderManagementDto } from 'src/dtos/update-order-management.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { NotificationsService } from 'src/Modules/notifications/notifications.service';
import { Role } from 'src/enum/role.enum';
@UseGuards(jwtGuard)
@Controller()
export class AgentOrdernotificationController {
  constructor(private readonly agentOrdernotificationService: AgentOrdernotificationService,
    private readonly orderManagementService:OrderManagementService,   
    private readonly notificationService:NotificationsService 
    )
    {}
      @Post(":orderid")
      async orderApproval(@Request() req,@Res()res:Response,@Body() data:CreateAgentOrdernotificationDto,@Param("orderid")orderid:string,@Body() orderdata:UpdateOrderManagementDto){
        const status = data.status;
        const agentid=req.user.id
        orderdata.agent=agentid
        let dealerid
        if(status ==  true){
          const result = await this.orderManagementService.assignAgentOrder(orderid,orderdata)
          console.log(result)
          const result2 = await this.orderManagementService.get(orderid);
          console.log(result2)
          await this.notificationService.sendNotification(
                     'Agent Accept',`Agent accept the order ${orderid}`,Role.DEALER,dealerid)           
          if(!result){return res.status(404).json({message:"results not found"})}
          else{return res.status(HttpStatus.OK).json({message:"results  found",orderid:result2.id,
          shopname:result2.dealer.restaurant_name,shopaddress:result2.dealer.restaurant_address,
          
  })}
        }else{
          return res.status(HttpStatus.PARTIAL_CONTENT).json({message:"agent not accept the order"})
        }
      }

  
}
