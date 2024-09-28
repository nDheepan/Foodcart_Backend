import { BadRequestException, Injectable,Request } from '@nestjs/common';
import { CreateDealerPayoutDto } from '../../../dtos/create-dealer_payout.dto';
import { UpdateDealerPayoutDto } from '../../../dtos/update-dealer_payout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import { count } from 'console';

@Injectable()
export class DealerPayoutService {
  constructor(
    @InjectRepository(Dealer_Entity)    
    private readonly dealerorderrepo:Repository<Dealer_Entity>){}
    
    async getPayout(id:number){
     
      const today =new Date();
      const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                    .where("dealer.id = :id",{id:id})
                    .andWhere('DATE(order.created_at) = :today',{today:today.toISOString().split('T')[0]})
                    .leftJoin("dealer.order","order")                  
                    .select('COUNT(order.id)','sum(order.total')
                    .getRawOne();
            if(result){
            return {payout:result}}
            else{throw new BadRequestException()}
    }
    async monthPayout(id:number){
      const last30daysDate = new Date(); 
      last30daysDate.setDate(last30daysDate.getDate()- 30);
      const result = await this.dealerorderrepo.createQueryBuilder("dealer")      
                    .where("dealer.id = :id",{id:id})
                    .andWhere("order.created_at >= :last30daysDate",{last30daysDate} )
                    .leftJoin("dealer.order","order")
                    .select('COUNT(order.id)','sum(order.total')
                    .getRawOne();
            if(result){
              return {payout:result}}
              else{throw new BadRequestException()}
    }

    async weekPayout(id:number){
      const sevendaysAgo = new Date() 
      sevendaysAgo.setDate(sevendaysAgo.getDate() - 7);
        const result = await this.dealerorderrepo.createQueryBuilder("dealer")    
                      .where("dealer.id = :id",{id:id})
                      .andWhere("order.created_at >= :sevendaysAgo",{sevendaysAgo} )
                      .leftJoin("dealer.order","order")
                      .select('COUNT(order.id)','sum(order.total')
                      .getRawOne();
              if(result){
                return {payout:result}}
              else{throw new BadRequestException()}
      }
  
    async getDateBwPayout(id:number,start:string,end:string){
      const result = await this.dealerorderrepo.createQueryBuilder("dealer")
                    .where("dealer.id = :id",{id:id})
                    .andWhere("DATE(order.created_at) >= DATE(:start)",{start:start} )
                    .andWhere("DATE(order.created_at) <= DATE(:end)",{end:end})
                    .leftJoin("dealer.order","order")
                    .select('COUNT(order.id)','sum(order.total')
                    .getRawOne();
            if(result){
              return {payout:result}}
              else{throw new BadRequestException()}
              
      }

  async dayPayout(id:number){
    const current_date = new Date();
    const queryBuilder = await this.dealerorderrepo.createQueryBuilder("dealer"); 
    const result = await queryBuilder
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(order.created_at) = DATE(:current_date)",{current_date})
                  .leftJoin("dealer.order","order")
                  .select('COUNT(order.id)','sum(order.total')
                  .getRawOne();
          if(result){
            return {payout:result}}
            else{throw new BadRequestException()}
          }
  




}

