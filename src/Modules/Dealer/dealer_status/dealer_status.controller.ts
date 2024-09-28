import { Controller, Get,Request, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { DealerStatusService } from './dealer_status.service';
import { CreateDealerStatusDto } from '../../../dtos/create-dealer_status.dto';
import { UpdateDealerStatusDto } from '../../../dtos/update-dealer_status.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';


@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerStatusController {
  constructor(private readonly dealerStatusService: DealerStatusService,

    ) {}

   @Patch('scheduleStatus')
   async updateStatus(@Request() req,@Body() createDealerStatus:CreateDealerStatusDto){
    const id = req.user.dealerid;
    const day = createDealerStatus.schedule;
   
      if(createDealerStatus.delay){
        if(createDealerStatus.delay <= 24 ){
        createDealerStatus.status =  false;
      await this.dealerStatusService.updateByHours(id,createDealerStatus);
      const time = new Date().getHours() + createDealerStatus.delay;
      if(time >12 && 24 <= time){
        console.log(`you have to been successfully log in on ${time - 24} am `)
      }
      else if(time > 12 && 24 >= time){
        console.log(`you have to been successfully log in on ${time - 12} pm `)

      }
      else if(time < 12){
        console.log(`you have to been successfully log in on ${time} am `)

      }
      else{
        console.log(` you exceed a time limit so try wee`)
      }
          }
          else{

            throw new UnauthorizedException("invalid input")

          }
   
        }
      else if(createDealerStatus.schedule){
        if((createDealerStatus.schedule).toUpperCase() === 'TOMORROW'){
        createDealerStatus.status =  false;
        const hour = new Date().getHours();
        const minutes = new Date().getMinutes() * 60;
        const seconds = new Date().getSeconds();
        const extra_time = minutes + seconds;
        const day = 24 - hour;
        const morning = 9;
        createDealerStatus.delay = ((day + morning) * 60 * 60) - extra_time  ;
       // createDealerStatus.delay = (day + morning )* 60 * 60  ;
       await this.dealerStatusService.updateByTomarrow(id,createDealerStatus);
       console.log(`you have to been successfully log in on tomorrow morning ${morning}`) }

      else{
        throw new UnauthorizedException("invalid input")
      }
      
      }
      else if(createDealerStatus.schedule_days){

        createDealerStatus.status =  false;
        const hour = new Date().getHours();

        const minutes = new Date().getMinutes() * 60;

        const seconds = new Date().getSeconds();

        const extra_time = minutes + seconds;
        const day = 24 - hour;

        const morning = 9;
        const days = createDealerStatus.schedule_days * 24 * 60 * 60;

        createDealerStatus.delay = (((day + morning) * 60 * 60) + days)  - extra_time  ;
        await this.dealerStatusService.updateByDays(id,createDealerStatus);

        console.log(`you have to been successfully log in on morning ${morning} of after ${createDealerStatus.schedule_days} days`) 
      }   

       else if(createDealerStatus.manual){     
      
      if(createDealerStatus.manual === true){
      return this.dealerStatusService.updateStatus(id,createDealerStatus);
       }}
        
       else{
         
        throw new UnauthorizedException("Not found result");

       }      

        }

    @Patch('updateStatus')
    async manUpdate(@Request() req,createDealerStatus:CreateDealerStatusDto){

      const dealerid = req.user.dealerid;
      return this.dealerStatusService.updateStatus(dealerid,createDealerStatus);
    }
 
 }
