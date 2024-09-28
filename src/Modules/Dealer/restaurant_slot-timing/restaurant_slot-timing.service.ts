import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRestaurantSlotTimingDto } from '../../../dtos/create-restaurant_slot-timing.dto';
import { UpdateRestaurantSlotTimingDto } from '../../../dtos/update-restaurant_slot-timing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantSlotTiming } from 'src/entities/restaurant_slot-timing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantSlotTimingService {
  constructor(
    @InjectRepository(RestaurantSlotTiming)
    private readonly TimingRepo :Repository<RestaurantSlotTiming>){}
  async create(createRestaurantSlotTimingDto: CreateRestaurantSlotTimingDto) {
    return this.TimingRepo.save(createRestaurantSlotTimingDto)
  }

  async findAll(dealerid:string) {
    let opening:string;
    let closing:string;
    const querybuilder = await this.TimingRepo.createQueryBuilder("slot")
    const result = await querybuilder        
                   .where("slot.dealer = :dealerid",{dealerid:dealerid})
                   .select(["slot.from_time","slot.to_time","slot.id"])
                   .getRawMany();
                   
   result.forEach(row => { 
      opening = row.openning;
      closing = row.closing;  
    });
  return result;

  }

  async findOne(dealerid: string,id:string) {
    const querybuilder = await this.TimingRepo.createQueryBuilder("slot")
    const result = await querybuilder        
                   .where("slot.dealer = :dealerid",{dealerid:dealerid})
                   .andWhere("slot.id = :id",{id:id})
                   .getOne();
                   
     return {opening : result.from_time,closing : result.to_time};
    }

  async update(id: string, updateRestaurantSlotTimingDto: UpdateRestaurantSlotTimingDto) {
   const slot =  await  this.TimingRepo.update(id,updateRestaurantSlotTimingDto);
   if(!slot){throw new BadRequestException()}
   else{
    return {message:"update slot timing successfully"}
    }
  }

  async remove(id: string) {
    const querybuilder = await this.TimingRepo.createQueryBuilder("slot")
    const result = await querybuilder        
                   .where("slot.id = :id",{id:id})
                   .delete()
                   .execute();
    if(result){
      return {message:`id of ${id}`}
    }
    else{
      throw new  InternalServerErrorException("id not found")
    }
                   
}
}