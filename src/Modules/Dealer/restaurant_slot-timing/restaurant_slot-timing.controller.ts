import { Controller, Get, Post, Body, Patch,Request, Param, Delete, UseGuards, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { RestaurantSlotTimingService } from './restaurant_slot-timing.service';
import { CreateRestaurantSlotTimingDto } from '../../../dtos/create-restaurant_slot-timing.dto';
import { UpdateRestaurantSlotTimingDto } from '../../../dtos/update-restaurant_slot-timing.dto';
import { RolesGuard } from 'src/Guards/roles.guard';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { Response } from 'express';
@UseGuards(RolesGuard,jwtGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class RestaurantSlotTimingController {
  constructor(private readonly restaurantSlotTimingService: RestaurantSlotTimingService) {}

  @Post()
  async create(@Req() req:any,@Res() res:Response,@Body()createRestaurantSlotTimingDto : CreateRestaurantSlotTimingDto) {
    createRestaurantSlotTimingDto.dealer = req.user.dealerid;
    const result = await this.restaurantSlotTimingService.create(createRestaurantSlotTimingDto);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.BAD_REQUEST)}
  }

  @Get()
  findAll(@Req() req:any,@Res() res:Response) {
    const dealerid = req.user.dealerid;
    return this.restaurantSlotTimingService.findAll(dealerid);
  }

  @Get('/:dealerid/:id')
  async findOne(@Param('dealerid') dealerid: string,@Param('id') id:string,@Req() req:any,@Res() res:Response) {
    const result = await this.restaurantSlotTimingService.findOne(dealerid,id);
          if(result){return res.status(HttpStatus.OK).json(result)}
          else{return result;}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRestaurantSlotTimingDto: UpdateRestaurantSlotTimingDto,@Req() req:any,@Res() res:Response) {
    const result = await this.restaurantSlotTimingService.update(id, updateRestaurantSlotTimingDto);
    if(result){return res.status(HttpStatus.OK).json(result)}
          else{return result;}
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req:any,@Res() res:Response) {
    const result =await  this.restaurantSlotTimingService.remove(id);
    if(result){return result}
    else{return res.status(HttpStatus.OK).json(result)}
  }
}
