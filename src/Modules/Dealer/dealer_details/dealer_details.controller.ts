import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, Patch, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DealerDetailsService } from './dealer_details.service';
import { CreateDealerDto } from '../../../dtos/create-dealer_detail.dto';
import { UpdateDealerDetailDto } from '../../../dtos/update-dealer_detail.dto';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { CreateRestaurantSlotTimingDto } from 'src/dtos/create-restaurant_slot-timing.dto';
import { RestaurantSlotTimingService } from '../restaurant_slot-timing/restaurant_slot-timing.service';
@Controller()
export class DealerDetailsController {
    constructor(private readonly dealerDetailService:DealerDetailsService,
      ){}

  @Get()
    async getAllUser(): Promise<Dealer_Entity[]>{
      const users=await this.dealerDetailService.getAllUser();
      return users;
    }

  @Get(':id')
    async getUser(@Param('id') id:string,@Req() req: any,@Res() res:any): Promise<any>{
        const user = await this.dealerDetailService.getUser(id);
        if(user ){
        res.status(HttpStatus.OK).json({message:"dealer details found successfully",user})
                 }
        else{
            res.status(HttpStatus.NOT_FOUND).json({messsage:"dealer  details not found "})  
            }
    }  
      


  @Post()
    async addUser(@Body() CreateUserDto:CreateDealerDto,@Body() createslotdto:CreateRestaurantSlotTimingDto,@Req() req: any,@Res() res:any){

      const o_hrs=(new Date(CreateUserDto.opens_at).getHours()).toString();
      const o_mints =(new Date(CreateUserDto.opens_at).getMinutes()).toString();
      CreateUserDto.opens_at=o_hrs +":"+o_mints;
      const c_hrs = (new Date(CreateUserDto.closes_at).getHours()).toString();
      const c_mints = (new Date(CreateUserDto.closes_at).getHours()).toString();
      CreateUserDto.closes_at=c_hrs,":",c_mints;    
      const newuser=await this.dealerDetailService.addUser(CreateUserDto)      
      if(newuser ){
        res.status(HttpStatus.OK).json({message:"dealer details added successfully",newuser})
                  }
      else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({messsage:"dealer  details not added perfectly "})
          }         
    }   
   
         
         
  @Delete(':id')
    async deleteuser(@Param('id') id:string,@Req() req: any,@Res() res:any):Promise<any>{
      const user = await this.dealerDetailService.deleteuser(id);
      if(user ){
        res.status(HttpStatus.OK).json({message:"dealer details deleted successfully",user})
      }
      else{
        res.status(HttpStatus.NOT_FOUND).json({messsage:"dealer  not found "})       
      }     
    }  


   @Patch(':id')
    async updateUser(@Param('id') id:string,@Body()updateDealerDto:UpdateDealerDetailDto,@Req() req: any,@Res() res:any){
      const user = await  this.dealerDetailService.updateUser(id,updateDealerDto);
      if(user ){
        res.status(HttpStatus.OK).json({message:"dealer details updated successfully",user})
               }
      else{
        res.status(HttpStatus.NOT_FOUND).json({messsage:"dealer  details not found "})
          }
    }

 }