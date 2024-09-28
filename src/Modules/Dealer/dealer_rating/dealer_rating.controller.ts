import { Controller, Get, Post, Body, Patch,Request, Param, Delete, UseGuards } from '@nestjs/common';
import { DealerRatingService } from './dealer_rating.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { get } from 'node:http';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)

@Controller()
export class DealerRatingController {
  constructor(private readonly dealerRatingService: DealerRatingService) {}

  @Get()
  async dealerrating(@Request() req){
    const dealerid = req.user.dealerid;

    return this.dealerRatingService.getRating(dealerid);
  }
  
  @Get("getdateRating")
  async getDateRating(@Request() req,@Body('date') date:string){

    const dealerid = req.user.dealerid;
    return this.dealerRatingService.getDateRating(dealerid,date);

  }
  @Get("getWeekRating")
  async getWeekRating(@Request() req,){

    const dealerid = req.user.dealerid;
    return this.dealerRatingService.getWeekRating(dealerid);

  }
  @Get("getMonthRating")
  async getMonthRating(@Request() req,){

    const dealerid = req.user.dealerid;
    return this.dealerRatingService.getMonthRating(dealerid);

  }

  @Get("getDayRating")
  async getDayRating(@Request() req,){

    const dealerid = req.user.dealerid;
    return this.dealerRatingService.getDayRating(dealerid);

  }

  
  



}
