import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, Res, InternalServerErrorException, HttpStatus, Req } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { CreateOrderManagementDto } from '../../../dtos/create-order-management.dto';
import { UpdateOrderManagementDto } from '../../../dtos/update-order-management.dto';
import { NotificationsService } from 'src/Modules/notifications/notifications.service';
@Controller()
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService,   
    ) {}
   someDate = new Date();

   
@Post('ordermanage')
  async create(@Body() createOrderManagementDto: CreateOrderManagementDto,@Req() req :any,@Res() res:any) {
    
        if(createOrderManagementDto.preorder == true){
        createOrderManagementDto.dealer   = null
        console.log(createOrderManagementDto);
        const result = await  this.orderManagementService.create(createOrderManagementDto);
        if(result){ return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
        }
        else{
          createOrderManagementDto.schedule_date = null;
          createOrderManagementDto.schedule_time = null;
          createOrderManagementDto.dealer   = null;
          console.log(createOrderManagementDto);
          const result = await this.orderManagementService.create(createOrderManagementDto);
        if(result){ return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
        }
  }

@Get()
  async findAll(@Req() req :any,@Res() res:any) {
      const result = await this.orderManagementService.findAll();
      if(result){ return res.status(HttpStatus.OK).json(result)}
      else{return res.status(HttpStatus.NOT_FOUND)}
    }
  

 

@Get(':id')
  async findOne(@Param('id') id: string,@Res() res:any,@Req() req :any) {
      const result = await this.orderManagementService.findOne(id);
      if(result){return res.status(HttpStatus.OK).json(result) }
      else{return res.status(HttpStatus.NOT_FOUND)}
  }

@Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderManagementDto: UpdateOrderManagementDto,@Res() res:any,@Req() req :any) {
      const result =  await this.orderManagementService.update(id, updateOrderManagementDto);
      if(result){return res.status(HttpStatus.OK).json(result)}
      else{return res.status(HttpStatus.NOT_FOUND)}
  }

@Delete(':id')
  async remove(@Param('id') id: string,@Res() res:any,@Req() req :any) {
      const result = await this.orderManagementService.remove(id);
      if(result){return res.status(HttpStatus.OK).json(result)}
      else{return res.status(HttpStatus.NOT_FOUND)}
  }

 

  @Patch('scheduleChange/:id/:userid')
  async updateSchedule(@Param('id') id:string,@Param('userid') userid:string,@Body() updatePreOrderManagementDto:UpdateOrderManagementDto,@Res() res:any,@Req() req :any){
   if(updatePreOrderManagementDto.preorder == true){
    const result =await this.orderManagementService.update(id,updatePreOrderManagementDto)
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
   }else{
    return null;
   }
  }

  @Post('orderUpdate/:id/:userid')
  async OrdeUpdate(@Param('id') id:string,@Param('userid') userid:string,@Body() updateManagementDto:UpdateOrderManagementDto,@Res() res:any,@Req() req :any){
    const result = await this.orderManagementService.orderUpdate(id,updateManagementDto);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
   }
  

  @Post('orderNotify/:orderid/:dealerid')
  async orderAssign(@Param('orderid') orderid:string,@Param('dealerid') dealerid:string,@Res() res:any,@Req() req :any){
    const result = await this.orderManagementService.orderNotify(orderid,dealerid);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  }


   

  
  

