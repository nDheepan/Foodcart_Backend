import { Injectable } from '@nestjs/common';
import { CreateScheduleOrderPayoutDto } from '../../../dtos/create-schedule-order_payout.dto';
import { UpdateScheduleOrderPayoutDto } from '../../../dtos/update-schedule-order_payout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleOrderPayoutService {
  constructor(@InjectRepository(Dealer_Entity)
  private readonly dealerorderrepo:Repository<Dealer_Entity>
  ){}
  async getDatePayout(id:number,createPayoutDto:CreateScheduleOrderPayoutDto){

    const date = createPayoutDto.date;
    const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                  .where("dealer.id = :id",{id:id})
                  .andWhere('DATE(scheduleorder.created_at) = :date',{date:date})
                  .leftJoin("dealer.scheduleorder","scheduleorder")
                  .select(["COUNT(scheduleorder.id)","sum(scheduleorder.total)"])
                  .getRawOne();
  if(result.orders == 0){
    return "no specific results found"
  }
  else{
    return {payout:result}

  }

}
async monthPayout(id:number){
  const last30daysDate = new Date(); 
  last30daysDate.setDate(last30daysDate.getDate()- 30);
  const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                .where("dealer.id = :id",{id:id})
                .andWhere("DATE(scheduleorder.created_at) >= :last30daysDate",{last30daysDate} )
                .leftJoin("dealer.scheduleorder","order")
                .select(["COUNT(scheduleorder.id)","sum(scheduleorder.total)"])
                .getRawOne();
                if(result.orders == 0){
                  return "no specific results fouund"
                }
                else{
                  return {payout:result}
                }}

async weekPayout(id:number){
const sevendaysAgo = new Date() 
sevendaysAgo.setDate(sevendaysAgo.getDate() - 7);
const result = await this.dealerorderrepo.createQueryBuilder("dealer")
              .where("dealer.id = :id",{id:id})
              .andWhere("DATE(scheduleorder.created_at) >= :sevendaysAgo",{sevendaysAgo} )
              .leftJoin("dealer.scheduleorder","scheduleorder")
              .select(["COUNT(scheduleorder.id)","sum(scheduleorder.total)"])
              .getRawOne();
              if(result.orders == 0){

                return "no specific results fouund"
              }
              else{
                return {payout:result}
            
              } }

async getDateBwPayout(id:number,createPayoutDto:CreateScheduleOrderPayoutDto){
const start = createPayoutDto.start;
const end = createPayoutDto.end;
const result = await this.dealerorderrepo.createQueryBuilder("dealer")
              .where("dealer.id = :id",{id:id})
              .andWhere("DATE(scheduleorder.created_at) >= DATE(:start)",{start:start} )
              .andWhere("DATE(scheduleorder.created_at) <= DATE(:end)",{end:end})
              .leftJoin("dealer.scheduleorder","scheduleorder")
              .select(["COUNT(scheduleorder.id)","sum(scheduleorder.total)"])
              .getRawOne();
            if(result.orders == 0){
              return "no specific results fouund"
            }
            else{
              return {payout:result}
            }
}

async dayPayout(id:number){
const current_date = new Date();
const result = await this.dealerorderrepo.createQueryBuilder("dealer")
              .where("dealer.id = :id",{id:id})
              .andWhere("DATE(scheduleorder.created_at) = DATE(:current_date)",{current_date})
              .leftJoin("dealer.scheduleorder","scheduleorder")
              .select(["COUNT(scheduleorder.id)","sum(scheduleorder.total)"])
              .getRawOne();
              if(result.orders == 0){
                return "no specific results fouund"
              }
              else{
                return {payout:result}
              }
}


}