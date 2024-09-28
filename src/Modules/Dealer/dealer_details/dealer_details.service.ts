import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Dealer from '../../../entities/dealer_detail.entity';
import { CreateDealerDto } from '../../../dtos/create-dealer_detail.dto';
import * as bcrypt from 'bcrypt';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { UpdateDealerDetailDto } from '../../../dtos/update-dealer_detail.dto';
import { Rating } from 'src/entities/rating.entity';
import { CreateDealerStatusDto } from '../../../dtos/create-dealer_status.dto';
import { UpdateRestaurantSlotTimingDto } from 'src/dtos/update-restaurant_slot-timing.dto';
import { CreateRestaurantSlotTimingDto } from 'src/dtos/create-restaurant_slot-timing.dto';
import { RestaurantSlotTimingService } from '../restaurant_slot-timing/restaurant_slot-timing.service';
@Injectable()
export class DealerDetailsService {
    constructor(
        @InjectRepository(Dealer_Entity)
          private DealerRepository:Repository<Dealer_Entity>,
          private readonly slotService:RestaurantSlotTimingService

    ) {}
   
  async getAllUser(){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                   .getMany();
    if(result){return result}
    else{throw new BadRequestException()}
   }      
   
   
  async findOne(username: string): Promise<Dealer_Entity | any> {
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                   .where("dealer.username = :username",{username:username})
                   .getOne();
    if(result){return result;}
    else{throw new BadRequestException()}
  }
   
  async getUser(id:string){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                                 .where("dealer.id = :id",{id:id})
                                 .getOne();                   
          if(!result){throw new UnauthorizedException()}
          else{return result;}                   
    }

  async findUser(email:string){
    const user = await this.DealerRepository.createQueryBuilder("dealer")
                 .where("dealer.emailid = :email",{email:email})
                 .getOne();
    if(user){return user;}
    else{throw new UnauthorizedException;}
   }  



  async getuser(mobile:number){
     const result= await this.DealerRepository.createQueryBuilder("dealer")
                  .where("dealer.user_mobile = :mobile  OR managestaff.mobile = :mobile",{mobile:mobile})
                  .leftJoin("dealer.managestaff","managestaff")
                  .select(['dealer.id','managestaff.id','dealer.role','managestaff.role'])
                  .getRawOne();
      if(result){return result}
      else{throw new BadRequestException()}
   }

  async addUser(createUserDto:CreateDealerDto){
    const password = createUserDto.password;
    const hashpassword= await bcrypt.hash(password,12);
    createUserDto.password=   hashpassword;
    return this.DealerRepository.save(createUserDto);   
  }

    async createSlot(id:any,createSlotdto:CreateRestaurantSlotTimingDto)
    {
       createSlotdto.dealer=id;
       const slot = await this.slotService.create(createSlotdto)
       if(slot){return {message:"slot timing added successfully",}}
       else{throw new InternalServerErrorException("error in save slot");}
    }

   
    async updateUser(userid:string,data:any){
    /*  const result = await this.DealerRepository.createQueryBuilder("dealer")
                     .where("dealer.id = :id",{id:userid})
                     .update()
                     .set(data)
                     .execute(); */
        const result = await this.DealerRepository.update(userid,data)
            if(result){return result}
            else{throw new BadRequestException()}
    }
    
  async deleteuser(userid:string) {
    const user = await this.DealerRepository.createQueryBuilder("dealer")
                .where("dealer.id = :id",{id:userid})
                .delete()
                .execute();
          if (!user) {throw new BadRequestException();}
          return {message:"user record removed successfully"};
  }
  async updateOne(userid:number,data:any){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                   .where("dealer.id = :id",{id:userid})
                   .update()
                   .set({reset:data})
                   .execute(); 
          if(result){return result}
          else{throw new BadRequestException()}
  }

  async updatePass(userid:number,data:any){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                  .where("dealer.id = :id",{id:userid})
                  .update()
                  .set({password:data})
                  .execute(); 
          if(result){return result}
          else{throw new BadRequestException()}  
  }
    
    
  async getOne(code:any){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                  .where("dealer.reset = :code",{code:code}) 
                  .leftJoin("dealer.managestaff","managestaff")
                  .select(['dealer.id','managestaff.id','dealer.role','staff.role'])
                  .getRawOne();
          if(result){return result}
          else{throw new BadRequestException()}
  }
        
  

  async updateStatus(userid:number,status:boolean){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                  .where("dealer.id = :id",{id:userid})
                  .update()
                  .set({is_active:status})
                  .execute(); 
          if(result){return result}
          else{throw new BadRequestException()}  
  }
    


  async updateRating(id:number,rating:any){
    const result = await this.DealerRepository.createQueryBuilder("dealer")
                  .where("dealer.id = :id",{id:id})
                  .update()
                  .set({ratings:rating})
                  .execute(); 
        if(result){return result}
        else{throw new BadRequestException()}  
  }
}




