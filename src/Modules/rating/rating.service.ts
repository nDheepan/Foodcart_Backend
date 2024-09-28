import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRatingDto } from '../../dtos/create-rating.dto';
import { UpdateRatingDto } from '../../dtos/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../../entities/rating.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Dealer_Entity from '../../entities/dealer_detail.entity';

@Injectable()
export class RatingService {

  constructor(@InjectRepository(Rating)
  private ratingrepository:Repository<Rating>
  ){}
  
  async create(createRatingDto: CreateRatingDto) {
    const result =await this.ratingrepository.save(createRatingDto);
    if(result){return result}
    else{throw new BadRequestException()}
  }
  async findAll() {
    const result = await this.ratingrepository.find();
    if(result){return result}
    else{throw new BadRequestException()}
  }

  async findOne(id: string) {
    const result = await this.ratingrepository.createQueryBuilder('rating')
                  .where('rating.id = :id', { id:id })
                  .getOne();
    if (!result) {
      throw new BadRequestException('No matching rating found');
    } else {
      return result;
    }
  }
  

async update(id: string, updateRatingDto: UpdateRatingDto) {
    const result =  await this.ratingrepository.update(id,updateRatingDto);
    if(result) {return result}
    else{throw new BadRequestException()}
  }

  async remove(id: string) {
    const rating= await this.ratingrepository.createQueryBuilder("rating")
                  .where("rating.id = :id",{id:id})
                  .getRawOne();
    if(rating){throw new BadRequestException('no matching rating found')
    }else{
    return this.ratingrepository.remove(rating); 
    }
  }

  async getTodayComplient(id:string,){

    const complientQueryBuilder = await this.ratingrepository.createQueryBuilder("rating");
    const today = new Date();
    const result = await complientQueryBuilder 
                   .where("rating.dealer =:id",{id:id})
                   .andWhere("DATE(order.created_at) = :today",{today:today})
                   .andWhere("rating.complient IS NOT NULL")
                   .leftJoin("rating.user","user")
                   .leftJoin("rating.order","order")
                   .select(["rating.complient","order.id","user.name"])
                   .getRawMany();
        if(!result){
          throw new UnauthorizedException()
        }
        else{
        return result;
        }
  }
async getComplient(id:string,complientid:string){

 const complientQueryBuilder = await this.ratingrepository.createQueryBuilder("rating");
    const result = await complientQueryBuilder 
                   .where("rating.dealer = :id",{id:id})
                   .andWhere("rating.complient IS NOT NULL")
                   .andWhere("rating.id = :complientid",{complientid:complientid})
                   .leftJoin("rating.user","user")
                   .leftJoin("rating.order","order")
                   .select(["rating.complient","user.name","order.id"])
                   .getRawOne();
        if(!result){throw new BadRequestException(" no complients found")}
        else{
        return result;
        }

}

async getAllComplients(id:string){

  const complientQueryBuilder = await this.ratingrepository.createQueryBuilder("rating");
     const result = await complientQueryBuilder 
                    .where("rating.dealer = :id",{id:id})
                    .andWhere("rating.complient IS NOT NULL")
                    .leftJoin("rating.user","user")
                    .leftJoin("rating.order","order")
                    .select(["rating.complient","user.name","order.id"])
                    .getRawMany();
          if(!result){throw new BadRequestException(" no complients found")}
          else{
          return result;
          }
}

async getWeekComplients(id:string){

   
  const complientQueryBuilder = await this.ratingrepository.createQueryBuilder("rating");

  const last7days = new Date();
  last7days.setDate(last7days.getDate() - 7 )
     const result = await complientQueryBuilder 
                    .where("rating.dealer = :id",{id:id})
                    .andWhere("rating.complient IS NOT NULL")
                    .andWhere("DATE(order.created_at)  >= :last7days",{last7days:last7days})
                    .leftJoin("rating.user","user")
                    .leftJoin("rating.order","order")
                    .select(["rating.complient","user.name","order.id"])
                    .getRawMany();
            if(!result){throw new BadRequestException(" no complients found")}
            else{
            return result;
            }
 
 }

 async getMonthComplients(id:string){

   
  const complientQueryBuilder = await this.ratingrepository.createQueryBuilder("rating");

  const last30days = new Date();
  last30days.setDate(last30days.getDate() - 30 )
     const result = await complientQueryBuilder 
                    .where("rating.dealer = :id",{id:id})
                    .andWhere("rating.complient IS NOT NULL")
                    .andWhere("DATE(order.created_at)  >= :last30days",{last30days:last30days})
                    .leftJoin("rating.user","user")
                    .leftJoin("rating.order","order")
                    .select(["rating.complient","user.name","order.id"])
                    .getRawMany();
            if(!result){throw new BadRequestException(" no complients found")}
            else{
            return result;
            }
 
 }

 async getDateComplients(id:string,date:string){

  const complientQueryBuilder = await this.ratingrepository.createQueryBuilder("rating");
     const result = await complientQueryBuilder 
                    .where("rating.id = :id",{id:id})
                    .andWhere("rating.complient IS NOT NULL")
                    .andWhere("DATE(order.created_at)  = DATE(:date)",{date:date})
                    .leftJoin("rating.user","user")
                    .leftJoin("rating.order","order")
                    .select(["rating.complient","user.name","order.id"])
                    .getRawMany();
            if(!result){throw new UnauthorizedException(" no complients found")}
            else{
            return result;
            }
 
 }


 async getDateRating(id:string,date:string){
  const queryBuilder = await this.ratingrepository.createQueryBuilder("rating");
    
    const result = await queryBuilder
                  .leftJoin("rating.dealer","dealer")
                  .leftJoin("rating.order","order")
                  .leftJoin("rating.user","user")
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(order.created_at) = DATE(:date)",{date:date})
                  .select(["order.id","rating.comments","rating.dealer_star","user.name"])
                  .getRawMany();
 
   return {rating_history:result}
 }

 async getWeekRating(id:number){
  const last7days = new Date();
  last7days.setDate(last7days.getDate() - 7 )
  const queryBuilder = await this.ratingrepository.createQueryBuilder("rating");
    
    const result = await queryBuilder
                  .leftJoin("rating.dealer","dealer")
                  .leftJoin("rating.order","order")
                  .leftJoin("rating.user","user")
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(order.created_at) >= :last7days",{last7days:last7days})
                  .select(["order.id","rating.comments","rating.dealer_star","user.name"])
                  .getRawMany();
 
   return {rating_history:result}
 }

 async getMonthRating(id:number){
  const last30days = new Date();
  last30days.setDate(last30days.getDate() - 30 )
  const queryBuilder = await this.ratingrepository.createQueryBuilder("rating");
    
    const result = await queryBuilder
                  .leftJoin("rating.dealer","dealer")
                  .leftJoin("rating.order","order")
                  .leftJoin("rating.user","user")
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(order.created_at) >= :last30days",{last30days:last30days})
                  .select(["order.id","rating.comments","rating.dealer_star","user.name"])
                  .getRawMany();
 
   return {rating_history:result}
 }

 async getDayRating(id:number){
  const today = new Date();
  const queryBuilder = await this.ratingrepository.createQueryBuilder("rating");
    
    const result = await queryBuilder
                  .leftJoin("rating.dealer","dealer")
                  .leftJoin("rating.order","order")
                  .leftJoin("rating.user","user")
                  .where("dealer.id = :id",{id:id})
                  .andWhere("DATE(order.created_at) >= DATE(:today)",{today:today})
                  .select(["order.id","rating.comments","rating.dealer_star","user.name"])
                  .getRawMany();
 
   return {rating_history:result}
 }
 

}