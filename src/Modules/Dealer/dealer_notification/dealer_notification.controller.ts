import { Controller, Get, Request,Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { DealerNotificationService } from './dealer_notification.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerNotificationController {
  constructor(private readonly dealerNotificationService: DealerNotificationService) {}

  @Get("allNotification")
    async getAllNotification(@Req() req:any,@Res() res:any ){

          const dealerid = req.user.dealerid;
          const result = await this.dealerNotificationService.findAll(dealerid);
          if(result){return res.status(HttpStatus.OK).json(result)}
          else{return res.status(HttpStatus.NOT_FOUND)}
    }
  

  @Get(":notificationid")
    async getNotification(@Req() req:any,@Res() res:any 
      ,@Param("notificationid") notificationid:number){

        const dealerid = req.user.dealerid;

        const result =await  this.dealerNotificationService.findOne(dealerid,notificationid);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}

  }
 
}
