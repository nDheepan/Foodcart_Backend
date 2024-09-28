import { Controller, Get, Post, Body,Request, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { DealerProfileService } from './dealer_profile.service';
import { CreateDealerProfileDto } from '../../../dtos/create-dealer_profile.dto';
import { UpdateDealerProfileDto } from '../../../dtos/update-dealer_profile.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import Dealer_Entity from 'src/entities/dealer_detail.entity';
import { Response } from 'express';
import { CreateDealerDto } from 'src/dtos/create-dealer_detail.dto';
import { UpdateDealerDetailDto } from 'src/dtos/update-dealer_detail.dto';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerProfileController {
  constructor(private readonly dealerProfileService: DealerProfileService,
    private readonly dealerDetailService : DealerDetailsService
    ) {}
 
@Get()
  async getprofile(@Req() req:any,@Res() res:Response):Promise<any>{ 
    
        const dealerid = req.user.dealerid;
        const dealerinfo = await this.dealerProfileService.getInfo(dealerid);
            if(dealerinfo){
              return res.status(HttpStatus.OK).json({message:"profile information found successflly",dealerinfo})
            }
            else{
              return res.status(HttpStatus.NOT_FOUND).json({message:"profile not found"});
            }
    }

@Patch()
  async updateInfo(@Req() req:any,@Body() data:UpdateDealerDetailDto,@Res() res:Response):Promise<any>{
    const dealerid = req.user.dealerid;
    const dealerinfo = await this.dealerProfileService.update(dealerid,data);
            if(dealerinfo){
              return res.status(HttpStatus.OK).json({message:" dealer information updated successflly"})
            }
            else{
              return res.status(HttpStatus.NOT_FOUND).json({message:"information not found  "});
            }

    }


  
}
