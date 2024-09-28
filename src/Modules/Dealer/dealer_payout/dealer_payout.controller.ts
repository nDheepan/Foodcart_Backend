import { Controller, Get, Post, Body,Request, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { DealerPayoutService } from './dealer_payout.service';
import { CreateDealerPayoutDto } from '../../../dtos/create-dealer_payout.dto';
import { UpdateDealerPayoutDto } from '../../../dtos/update-dealer_payout.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Response } from 'express';
@Roles(Role.ADMIN)
@UseGuards(jwtGuard,RolesGuard)
@Controller()
export class DealerPayoutController {
  constructor(private readonly dealerPayoutService: DealerPayoutService) {}

  @Get('getPayout')
    async payout(@Req() req:any,@Res() res:Response){
        const id =  req.user.dealerid;
        const result =await this.dealerPayoutService.getPayout(id);
          if(!result){return res.status(HttpStatus.NOT_FOUND)}
          else{return res.status(HttpStatus.OK).json({message:"records  found",result:result})}
    }

  @Get('weekpayout')
    async weekpayout(@Req() req:any,@Res() res:Response){
      const id =  req.user.dealerid;
      const result = await this.dealerPayoutService.weekPayout(id);
          if(!result){return res.status(HttpStatus.NOT_FOUND)}
          else{return res.status(HttpStatus.OK).json({message:"records  found",result:result})}
    }

  @Get('monthPayout')
    async monthPayout(@Req() req:any,@Res() res:Response){
      const id =  req.user.dealerid;
      const result = await this.dealerPayoutService.monthPayout(id);
          if(!result){return res.status(HttpStatus.NOT_FOUND)}
          else{return res.status(HttpStatus.OK).json({message:"records  found",result:result})}
    }

  @Get('RateBwpayout')
    async dateBwpayout(@Req() req:any,@Res() res:Response,@Body('start') start:string,@Body('end') end:string){
      const id = req.user.dealerid;
      const result =await this.dealerPayoutService.getDateBwPayout(id,start,end);
          if(!result){return res.status(HttpStatus.NOT_FOUND)}
          else{return res.status(HttpStatus.OK).json({message:"records  found",result:result})}
    }

  @Get('dayPayout')
    async dayPayout(@Req() req:any,@Res() res:Response){
      const id = req.user.dealerid;
      const result = await this.dealerPayoutService.dayPayout(id);
          if(!result){return res.status(HttpStatus.NOT_FOUND)}
          else{return res.status(HttpStatus.OK).json({message:"records  found",result:result})}
    }

}
