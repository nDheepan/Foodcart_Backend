import { Controller, Get, Post,Request, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from '../../dtos/create-rating.dto';
import { UpdateRatingDto } from '../../dtos/update-rating.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';

@Controller()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
/*
  @Post()
  create(@Body('dealerid') dealerid:any,@Body('userid') userid:any,@Body('orderid') orderid:any,@Body() createRatingDto: CreateRatingDto) {
    
    createRatingDto.dealer=dealerid;
    createRatingDto.user=userid;
    createRatingDto.order=orderid;
    return this.ratingService.create(createRatingDto);
  }
  */

  @Get()
  async findAll(@Req() req:any,@Res() res:any) {
    const result = await  this.ratingService.findAll(); 
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req:any,@Res() res:any) {
    const result =await this.ratingService.findOne(id);
          if(result){return res.status(HttpStatus.OK).json(result)}
          else{return res.status(HttpStatus.NOT_FOUND)}
  }

  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto,@Req() req:any,@Res() res:any) {
    const result = await  this.ratingService.update(id, updateRatingDto);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
  }

  

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req:any,@Res() res:any) {
    const result =await this.ratingService.remove(id);
          if(result){return res.status(HttpStatus.OK).json(result)}
          else{return res.status(HttpStatus.NOT_FOUND)}
  }
}
