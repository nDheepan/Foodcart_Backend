import { BadRequestException, Injectable } from '@nestjs/common';
import { RatingService } from 'src/Modules/rating/rating.service';

@Injectable()
export class DealerComplientsService {
  constructor(private readonly ratingService:RatingService
  ){}

  async getComplients(id:string){
    return this.ratingService.getTodayComplient(id);
  }

  async getComplient(id:string,complientid:string){
    const result = await this.ratingService.getComplient(id,complientid);
    if(result){return result;}
    else{throw new BadRequestException()}
  }
 
  async getMonth(id:string){
    const result =await this.ratingService.getMonthComplients(id);
    if(result){return result;}
    else{throw new BadRequestException()}
  }

  async getAll(id:string){
    const result = await this.ratingService.getAllComplients(id);
    if(result){return result;}
    else{throw new BadRequestException()}
  }


  async getWeek(id:string){
    const result =await this.ratingService.getWeekComplients(id);
    if(result){return result;}
    else{throw new BadRequestException()}
  }

  async getDate(id:string,date:string){
    const result = await  this.ratingService.getDateComplients(id,date);
    if(result){return result;}
    else{throw new BadRequestException()}
  }



}
