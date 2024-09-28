import { Injectable } from '@nestjs/common';
import { CreateDealerStatusDto } from '../../../dtos/create-dealer_status.dto';
import { UpdateDealerStatusDto } from '../../../dtos/update-dealer_status.dto';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { resolve } from 'path';

@Injectable()
export class DealerStatusService {
constructor(private readonly dealerservice:DealerDetailsService){}


  async updateByHours(id:string,createDealerStatus:CreateDealerStatusDto){

    
        await this.dealerservice.updateUser(id,{is_active:createDealerStatus.status});
        
        const time = new Promise((resolve) => {
          setTimeout(()=> {
          const status = true;
          const result =  this.dealerservice.updateUser(id,{is_active:status});
          resolve(1);
          },createDealerStatus.delay * 1000)
        });
  }  


  async updateByTomarrow(id:string,createDealerStatus:CreateDealerStatusDto){

        await this.dealerservice.updateUser(id,{is_active:createDealerStatus.status});

      const time = new Promise((resolve) => {
        setTimeout(()=> {
          const status =true;
          const result =  this.dealerservice.updateUser(id,{is_active:status});
          resolve(1);
        },createDealerStatus.delay * 1000)
        });
  }  

  async updateStatus(id:string,createDealerStatus:CreateDealerStatusDto){
      
    const status = createDealerStatus.status ;
    return this.dealerservice.updateUser(id,{is_active:status});
    
  }
   
  async updateByDays(id:string,createDealerStatus:CreateDealerStatusDto){

    await this.dealerservice.updateUser(id,{is_active:createDealerStatus.status});

  const time = new Promise((resolve) => {
    setTimeout(()=> {
      const status =true;
      const result =  this.dealerservice.updateUser(id,{is_active:status});
      resolve(1);
    },createDealerStatus.delay * 1000)
    });
}  

  
  

}

