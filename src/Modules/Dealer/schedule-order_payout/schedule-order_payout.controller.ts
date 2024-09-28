import { Controller, Get, Request,Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { ScheduleOrderPayoutService } from './schedule-order_payout.service';
import { CreateScheduleOrderPayoutDto } from '../../../dtos/create-schedule-order_payout.dto';
import { UpdateScheduleOrderPayoutDto } from '../../../dtos/update-schedule-order_payout.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { Response } from 'express';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class ScheduleOrderPayoutController {
  constructor(private readonly scheduleOrderPayoutService: ScheduleOrderPayoutService) {}

  @Get('getDatePayout')
  async payout(@Req() req:any,@Res() res:Response,@Body()createPayoutDto:CreateScheduleOrderPayoutDto){
  const id =  req.user.dealerid;
  if(createPayoutDto.date){
    const result = await this.scheduleOrderPayoutService.getDatePayout(id,createPayoutDto);
    if(result){return res.status(HttpStatus.OK).json({result})}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }
    else{
    throw new BadRequestException()
    }

  }

 @Get('weekpayout')
  async weekpayout(@Req() req:any,@Res() res:Response){
    const id =   req.user.dealerid;
    const result = await this.scheduleOrderPayoutService.weekPayout(id);
    if(result){return res.status(HttpStatus.OK).json({result})}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

   @Get('monthPayout')
  async monthPayout(@Req() req:any,@Res() res:Response){
    const id =  req.user.dealerid;
    const result = await this.scheduleOrderPayoutService.monthPayout(id);
    if(result){return res.status(HttpStatus.OK).json({result})}
    else{return res.status(HttpStatus.NOT_FOUND)}

  }

    @Get('DateBwpayout')
  async dateBwpayout(@Req() req:any,@Res() res:Response,@Body() createPayoutDto:CreateScheduleOrderPayoutDto){
    if(createPayoutDto.start && createPayoutDto.end){
    const id = req.user.dealerid;
    const result = await this.scheduleOrderPayoutService.getDateBwPayout(id,createPayoutDto);
    if(result){return res.status(HttpStatus.OK).json({result})}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }else{
    throw new UnauthorizedException();
  }
}

   @Get('dayPayout')
  async dayPayout(@Req() req:any,@Res() res:Response){

    const id = req.user.dealerid;
    const result = await  this.scheduleOrderPayoutService.dayPayout(id);
    if(result){return res.status(HttpStatus.OK).json({result})}
    else{return res.status(HttpStatus.NOT_FOUND)}

  }



}
