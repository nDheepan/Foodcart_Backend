import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { DealerComplientsService } from './dealer_complients.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Response } from 'express';
@Roles(Role.ADMIN,Role.EMPLOYEE)
@UseGuards(jwtGuard,RolesGuard)
@Controller()
export class DealerComplientsController {
  constructor(private readonly getcomplientservice:DealerComplientsService) {}  

  @Get("getMonth")
    async getMonth(@Req() req:any,@Res() res:Response){
        const dealerid = req.user.dealerid;
        const result = await this.getcomplientservice.getMonth(dealerid);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}

    }
  @Get('getToday')
    async getComplients(@Req() req:any,@Res() res:Response){
        const dealerid = req.user.dealerid;
        const result = await this.getcomplientservice.getComplients(dealerid);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
    }

  @Get('overAll')
    async getAll(@Req() req:any,@Res() res:Response){
        const dealerid = req.user.dealerid;
        const result =await this.getcomplientservice.getAll(dealerid);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
    }

  @Get("getWeek")
    async getWeek(@Req() req:any,@Res() res:Response){
        const dealerid = req.user.dealerid;
        const result =await this.getcomplientservice.getWeek(dealerid);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
    }


  @Get("getDate")
    async getDate(@Req() req:any,@Res() res:Response,@Body("date") date : string){
        const dealerid = req.user.dealerid;
        const result = await this.getcomplientservice.getDate(dealerid,date);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
    }

  @Get(':id')
    async getComplient(@Req() req:any,@Res() res:Response,@Param('id') id:string ){
        const dealerid = req.user.dealerid;
        const result = await this.getcomplientservice.getComplient(dealerid,id);
        if(result){return res.status(HttpStatus.OK).json(result)}
        else{return res.status(HttpStatus.NOT_FOUND)}
    }

 

  




  
}
