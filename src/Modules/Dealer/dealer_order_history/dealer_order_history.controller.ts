import { Controller, Get,Request, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req, Res, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { DealerOrderHistoryService } from './dealer_order_history.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';
import { createOrderHistoryDto } from '../../../dtos/createOrderHistoryDto.ts';
import { Response } from 'express';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerOrderHistoryController {
  constructor(private readonly dealerOrderHistoryService: DealerOrderHistoryService) {}

  @Get('orderhistorymonth')
    async  orderhistorymonth(@Req() req:any,@Res() res:Response){
      const id = req.user.dealerid
      const result =await this.dealerOrderHistoryService.getmonthHistory(id);
          if(!result){throw new UnauthorizedException()}
          else{return res.status(HttpStatus.OK).json({message:"orders found",result})}

    }

  @Get('orderhistoryweek')
  async  orderhistoryweek(@Req() req:any,@Res() res:Response){

    const id = req.user.dealerid
    const result =await this.dealerOrderHistoryService.getweekHistory(id);
    if(!result){throw new UnauthorizedException()}
    else{return res.status(HttpStatus.OK).json({message:"orders found",result})}
  }

  @Get('datebwHistory')

    async datebwHistory(@Req() req:any,@Res() res:Response,@Body() createOrderDto:createOrderHistoryDto){
      const id = req.user.dealerid;
          if(createOrderDto.start && createOrderDto.end){
          const result = await this.dealerOrderHistoryService.getDateBwHistory(id,createOrderDto);
          if(!result){throw new UnauthorizedException()}
          else{return res.status(HttpStatus.OK).json({message:"orders found",result})}
    }     else{throw new InternalServerErrorException();}
  }

  @Get('getDayHistory')
    async gatDayHistory(@Req() req:any,@Res() res:Response){
      const id = req.user.dealerid;
    const result = await this.dealerOrderHistoryService.getDayHistory(id);
        if(!result){throw new UnauthorizedException()}
        else{return res.status(HttpStatus.OK).json({message:"orders found",result})}

    }

  @Get('getDateHistory')
    async gatDateHistory(@Req() req:any,@Res() res:Response,@Body()createOrderDto:createOrderHistoryDto){
        const id = req.user.dealerid;
        if(createOrderDto.date){
        const result = await  this.dealerOrderHistoryService.getDateHistory(id,createOrderDto);
        if(!result){throw new UnauthorizedException()}
        else{return res.status(HttpStatus.OK).json({message:"orders found",result})}
        }
        else{
          throw new UnauthorizedException("Not valid input date")
        }

    }
 
}
