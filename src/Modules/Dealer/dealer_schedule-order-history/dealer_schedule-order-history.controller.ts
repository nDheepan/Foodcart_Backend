import { Controller, Get, Post, Body,Request, Patch, Param, Delete, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { DealerScheduleOrderHistoryService } from './dealer_schedule-order-history.service';
import { CreateDealerScheduleOrderHistoryDto } from '../../../dtos/create-dealer_schedule-order-history.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { UpdateDealerScheduleOrderHistoryDto } from 'src/dtos/update-dealer_schedule-order-history.dto';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerScheduleOrderHistoryController {
  constructor(private readonly dealerScheduleOrderHistoryService: DealerScheduleOrderHistoryService) {}
 
  @Get('orderhistorymonth')
  async  orderhistorymonth(@Req() req:any){
    const id = req.user.dealerid
    return this.dealerScheduleOrderHistoryService.getmonthHistory(id);
  
  }
  @Get('orderhistoryweek')
  async  orderhistoryweek(@Req() req:any){
    const id = req.user.dealerid
    return this.dealerScheduleOrderHistoryService.getweekHistory(id);
  }
  
  @Get('datebwHistory')
  async datebwHistory(@Req() req:any,@Body()createScheduleDto:CreateDealerScheduleOrderHistoryDto){
    const id = req.user.dealerid;
          if(createScheduleDto.start && createScheduleDto.end){
          return this.dealerScheduleOrderHistoryService.getDateBwHistory(id,createScheduleDto);
          }
          else{
          throw new UnauthorizedException("please neter valid start and end date")
          }
  }
  
  @Get('getDayHistory')
  async gatDayHistory(@Req() req:any){
    const id = req.user.dealerid;
    return this.dealerScheduleOrderHistoryService.getDayHistory(id);
  
  }

  @Get('getDateHistory')
  async gatDateHistory(@Req() req:any,@Body()createScheduleDto:CreateDealerScheduleOrderHistoryDto){
    const id = req.user.dealerid;
    if(createScheduleDto.date){
    return this.dealerScheduleOrderHistoryService.getDateHistory(id,createScheduleDto)
    }
    else{
      throw new UnauthorizedException("please enter valid input");
    }
  
  }

  

  
}
