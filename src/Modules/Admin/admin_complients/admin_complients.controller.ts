import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminComplientsService } from './admin_complients.service';

@Controller()
export class AdminComplientsController {
  constructor(private readonly adminComplientsService: AdminComplientsService) {}

  
  @Get("weekcomplients/:id")
      async getWeekComplients(@Param(":id") id:number){
      return this.adminComplientsService.getWeek(id)
   
  }
  
  @Get("Today/:id")
      async getTodayComplients(@Param(":id") id:number){
      return this.adminComplientsService.getMonth(id);
  }
 

  @Get("Monthcomplients/:id")
      async getMonthComplients(@Param(":id") id:number){
      return this.adminComplientsService.getMonth(id,);
  }

  @Get("dateComplients/:id")
      async getdayComplients(@Param("id") id:number,@Body('date') date:string){
      return this.adminComplientsService.getDay(id,date);
  }

  @Get('OverAll/:id')
      async getComplients(@Param(":id") id:number){
      return this.adminComplientsService.getComplients(id)
  }

  @Get("datedetails/:id")
      async getDetails(@Param('id') id : any,@Body('date') date:string){
      return this.adminComplientsService.getDay(id,date)
  }

}