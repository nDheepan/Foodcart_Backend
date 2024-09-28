import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { Repository } from 'typeorm';
import { createOrderHistoryDto } from '../../../dtos/createOrderHistoryDto.ts';

@Injectable()
export class DealerOrderHistoryService {

  constructor(
    @InjectRepository(Dealer_Entity)    
    private readonly dealerorderrepo:Repository<Dealer_Entity>){}
    async getmonthHistory(id:number){
      const last30daysDate = new Date(); 
      last30daysDate.setDate(last30daysDate.getDate()- 30);
      const result = await this.dealerorderrepo.createQueryBuilder("dealer") 
                    .where("dealer.id = :id",{id:id})
                    .andWhere("order.created_at >= :last30daysDate",{last30daysDate} )
                    .leftJoin("dealer.order","order")
                    .select(["order.id","order.deliverystatus","order.total","order.order_instruction","order.deliver_to","order_created_at"])
                    .getRawMany();
                    return result;
    }
         

    async getweekHistory(id:number){
       const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                      .where("dealer.id = :id",{id:id})
                      .andWhere("order.created_at >= current_date - interval'7 days'" )
                      .leftJoin("dealer.order","order")
                      .select(["order.id","order.deliverystatus","order.total","order.order_instruction","order.deliver_to","order.created_at"])          
                      .getRawMany();
                    return result;

}
      async getDateBwHistory(id:number,@Body()createOrderDto:createOrderHistoryDto){
        const start = createOrderDto.date;
        const end = createOrderDto.date;
        const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                      .where("dealer.id = :id",{id:id})
                      .andWhere("DATE(order.created_at) >= DATE(:start)",{start:start} )
                      .andWhere("DATE(order.created_at) <= DATE(:end)",{end:end})
                      .leftJoin("dealer.order","order")
                      .select(["order.id","order.deliverystatus","order.total","order.order_instruction","order.deliver_to","order.created_at"])       
                      .getRawMany();                      
        return result;

      }
      
      async getDayHistory(id:number){
          const current_date = new Date();
          const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                        .where("dealer.id = :id",{id:id})
                        .andWhere("DATE(order.created_at) = DATE(:current_date)",{current_date})
                        .leftJoin("dealer.order","order")
                        .select(["order.id","order.deliverystatus","order.total","order.order_instruction","order.deliver_to","order.created_at"])       
                        .getRawMany();
                         if(result === null){return result;}
                        else {throw new BadRequestException()}
          }

      async getDateHistory(id:number,createOrderDto:createOrderHistoryDto){
        
        const date = createOrderDto.date;
        const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                            .where("dealer.id = :id",{id:id})
                            .andWhere("DATE(scheduleorder.created_at) = DATE(:date)",{date:date})
                            .leftJoin("dealer.scheduleorder","scheduleorder")
                            .select("scheduleorder.id","orderid")
                            .select(["order.id","order.deliverystatus","order.total","order.order_instruction","order.deliver_to","order.created_at"])       
                            .getRawMany();
                    if(result === null){return result;}
                    else {throw new BadRequestException()}


          }
}