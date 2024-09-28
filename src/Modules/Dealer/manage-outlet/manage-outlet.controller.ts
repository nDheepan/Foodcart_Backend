import { Controller, Get, Request,Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { ManageOutletService } from './manage-outlet.service';
import { CreateManageOutletDto } from '../../../dtos/create-manage-outlet.dto';
import { UpdateManageOutletDto } from '../../../dtos/update-manage-outlet.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { Response } from 'express';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class ManageOutletController {
  constructor(private readonly manageOutletService: ManageOutletService) {}

  @Get('outletInfo')
  async getoutletinfo(@Req() req:any,@Res() res:Response)
  {
    const id = req.user.dealerid;
    const result = await   this.manageOutletService.findOne(id);
    if(result){
      return res.status(HttpStatus.OK).json({result})
    }
    else{
      return res.status(HttpStatus.UNAUTHORIZED).json({message:"No any data found"})
    }  }

  @Get('outletTimings')
  async getoutletTimings(@Request() req,@Res() res:Response){
      const id = req.user.dealerid;
    const result = await  this.manageOutletService.getTimings(id);
      if(result){
        return res.status(HttpStatus.OK).json({result})
      }
      else{
        return res.status(HttpStatus.UNAUTHORIZED).json({message:"result found"})
      }
  }

  @Get('phonenumbers')
  async getPhonenumbers(@Request() req,@Res() res:Response){
    const id = req.user.dealerid;
    const result = await   this.manageOutletService.getPhone(id);
    if(result){
      return res.status(HttpStatus.OK).json({result})
    }
    else{
      return res.status(HttpStatus.UNAUTHORIZED).json({message:"result found"})
    }
  }

  @Patch('updateOutlet')
  async updateOutlet(@Request() req,@Res() res:Response,@Body() data:any ){
    const id = req.user.dealerid;
    const result = await this.manageOutletService.updateData(id,data);
    if(result){
      return res.status(HttpStatus.OK).json({result})
    }
    else{
      return res.status(HttpStatus.UNAUTHORIZED).json({message:"result found"})
    }
  }

  @Patch('updateTiming/:id')
  async updateTiming(@Request() req,@Res() res:Response,@Param("id") id:string,@Body() data:any){
    const dealerid = req.user.dealerid;
    const result =await this.manageOutletService.updateTiming(id,dealerid,data);
    if(result){
      return res.status(HttpStatus.OK).json({result})
    }
    else{
      return res.status(HttpStatus.UNAUTHORIZED).json({message:"result found"})
    }

  }
}