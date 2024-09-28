import { Controller, Get, Query, Req, Request, UseGuards } from '@nestjs/common';
import { UserOrderHistoryService } from './user_order_history.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';

@UseGuards(jwtGuard)
@Controller()
export class UserOrderHistoryController {
    constructor(
        private readonly orderhistoryService:UserOrderHistoryService
    ){}
    @Get('history')
    async orderhistory(@Req() req){
      return this.orderhistoryService.orderhistory(req)
    }
}
