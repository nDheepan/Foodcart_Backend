import { Controller, Get, Post, Body, Request,Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ScheduleOrderManagementService } from './schedule_order-management.service';
import { CreateScheduleOrderManagementDto } from '../../../dtos/create-schedule_order-management.dto';
import { UpdateScheduleOrderManagementDto } from '../../../dtos/update-schedule_order-management.dto';


@Controller()
export class ScheduleOrderManagementController {
  constructor(private readonly scheduleOrderManagementService: ScheduleOrderManagementService) {}

  @Get()
  async findAll() {
    return this.scheduleOrderManagementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scheduleOrderManagementService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateScheduleOrderManagementDto: UpdateScheduleOrderManagementDto) {
    return this.scheduleOrderManagementService.update(+id, updateScheduleOrderManagementDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.scheduleOrderManagementService.remove(+id);
  }

  
  @Post("orderPlace/:id/:userid")
  async orderPlace(@Param('id') id:number,@Param('userid') userid:any,@Body() updateScheduleOrderManagementDto:UpdateScheduleOrderManagementDto ){
    const orderid = id;
    updateScheduleOrderManagementDto = userid;
    return this.scheduleOrderManagementService.updateOrder(orderid,updateScheduleOrderManagementDto);

  }

  
  @Post("assignOrder/:id/:dealerid")
  async assignOrder(@Param("id") id:number,@Param('dealerid') dealerid:any,@Body() UpdateScheduleOrderManagementDto:UpdateScheduleOrderManagementDto){
    UpdateScheduleOrderManagementDto.dealer = dealerid;
    return this.scheduleOrderManagementService.assignOrder(id,UpdateScheduleOrderManagementDto)

  }
  
}
