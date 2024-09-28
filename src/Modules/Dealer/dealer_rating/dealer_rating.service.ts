import { Injectable, ParseFloatPipe, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
import { Repository } from 'typeorm';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import { RatingService } from 'src/Modules/rating/rating.service';

@Injectable()
export class DealerRatingService {

  constructor(@InjectRepository(Dealer_Entity) private dealerratingrepo:Repository<Dealer_Entity> 
 , private readonly dealerService : DealerDetailsService,
 private readonly ratingService:RatingService
  ){}


  async getRating(id: number) {
    const result = await this.dealerratingrepo.createQueryBuilder("dealer")
                  .where("dealer.id = :id", { id: id })
                  .leftJoin("dealer.rating", "rating")
                  .select(["COUNT(rating.id)","AVG(rating.dealer_star)"])
                  .getRawOne();
              
    if (!result) {
      throw new UnauthorizedException("result not found");
    } else {
      const ratingstar = parseFloat(result.avgrating).toFixed(1); 
      let rating;
  
      if (result.ratings > 1000) {
        rating = `${(result.ratings / 1000).toString()}K`;
      } else if (result.ratings > 1000000) {
        rating = `${(result.ratings / 1000000).toString()}M`;
      }else if (result.ratings > 1000000000) {
        rating = `${(result.ratings / 1000000).toString()}B`;
      }
      else if (result.ratings > 1000000000000) {
        rating = `${(result.ratings / 1000000).toString()}T`;
      }

       else {
        rating = result.ratings.toString(); }
  
        await this.dealerService.updateRating(id,ratingstar);
      return { rating: ratingstar, ratings: rating };
    }
  }
  
      async getDateRating(id:string,date:string){

        return this.ratingService.getDateRating(id,date)
        
        }

      async getWeekRating(id:number){
        return this.ratingService.getWeekRating(id)

      }
      async getMonthRating(id:number){
        return this.ratingService.getMonthRating(id)

      }

      async getDayRating(id:number){
        return this.ratingService.getDayRating(id)

      }

}