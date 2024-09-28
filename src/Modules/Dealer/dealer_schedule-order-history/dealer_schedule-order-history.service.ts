import { Injectable } from '@nestjs/common';
import { CreateDealerScheduleOrderHistoryDto } from '../../../dtos/create-dealer_schedule-order-history.dto';
import { UpdateDealerScheduleOrderHistoryDto } from 'src/dtos/update-dealer_schedule-order-history.dto';
import { Repository } from 'typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DealerScheduleOrderHistoryService {

  constructor(@InjectRepository(Dealer_Entity)
    private readonly dealerorderrepo:Repository<Dealer_Entity>){}

  async getmonthHistory(id:number){
    const last30daysDate = new Date(); 
    last30daysDate.setDate(last30daysDate.getDate()- 30);
    const queryBuilder = await this.dealerorderrepo.createQueryBuilder("dealer");
    
    const result = await queryBuilder
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(scheduleorder.created_at) >= :last30daysDate",{last30daysDate} )
                  .leftJoin("dealer.scheduleorder","scheduleorder")
                  .select(["scheduleorder.id","scheduleorder.delivery_status","scheduleorder.total",
                  "scheduleorder.order_instruction","scheduleorder.deliver_to","scheduleorder.created_at"])
                  .getRawMany();
                  return {orderhistory:result}   
  }

  async getweekHistory(id:number){
    
    const queryBuilder = await this.dealerorderrepo.createQueryBuilder("dealer");
    const result = await queryBuilder
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(scheduleorder.created_at) >= current_date - interval'7 days'" )
                  .leftJoin("dealer.scheduleorder","scheduleorder")
                  .select(["scheduleorder.id","scheduleorder.delivery_status","scheduleorder.total",
                  "scheduleorder.order_instruction","scheduleorder.deliver_to","scheduleorder.created_at"])
                  .getRawMany();
                  return {orderhistory:result}
}
async getDateBwHistory(id:number,createScheduleDto:CreateDealerScheduleOrderHistoryDto){
  
  const start =  createScheduleDto.start ;
  const end =  createScheduleDto.end;
  const result = await this.dealerorderrepo.createQueryBuilder("dealer")
              .where("dealer.id = :id",{id:id})
              .andWhere("DATE(scheduleorder.created_at) >= DATE(:start)",{start:start} )
              .andWhere("DATE(scheduleorder.created_at) <= DATE(:end)",{end:end})
              .leftJoin("dealer.scheduleorder","scheduleorder")
              .select(["scheduleorder.id","scheduleorder.delivery_status","scheduleorder.total",
               "scheduleorder.order_instruction","scheduleorder.deliver_to","scheduleorder.created_at"
            ])
              .getRawMany();

   return {orderhistory:result}

}
  async getDayHistory(id:number){
      const current_date = new Date();
        const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                      .where("dealer.id = :id",{id:id})
                      .andWhere("DATE(scheduleorder.created_at) = DATE(:current_date)",{current_date})
                      .leftJoin("dealer.scheduleorder","scheduleorder")
                      .select(["scheduleorder.id","scheduleorder.delivery_status","scheduleorder.total",
                    "scheduleorder.order_instruction","scheduleorder.deliver_to","scheduleorder.created_at"
                  ])
                      .getRawMany();

      return {orderhistory:result}
  }

  async getDateHistory(id:number,createScheduleDto:CreateDealerScheduleOrderHistoryDto){
    
      const date = createScheduleDto.date;
      const queryBuilder = await this.dealerorderrepo.createQueryBuilder("dealer");
      
      const result = await queryBuilder
                    .where("dealer.id = :id",{id:id})
                    .andWhere("DATE(scheduleorder.created_at) = DATE(:date)",{date:date})
                    .leftJoin("dealer.scheduleorder","scheduleorder")
                    .select(["scheduleorder.id","scheduleorder.delivery_status","scheduleorder.total",
                    "scheduleorder.order_instruction","scheduleorder.deliver_to","scheduleorder.created_at"
                 ])
                    .getRawMany();
    if(result === null){
    return result;
    }
    else {
    return null;
    }
  }
}
