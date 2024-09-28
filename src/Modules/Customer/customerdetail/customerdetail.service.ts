import { Injectable,Request, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatecustomerDetailDto } from 'src/dtos/update-user-detail.dto';
import { User } from 'src/entities/customer_detail.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'
import { jwtConstants } from '../../../../constants';

@Injectable()
export class CustomerdetailService {
    constructor (
        @InjectRepository(User)
         private customerdetailRepository:Repository<User>
      ){}
      async getAlluser(){
          const users=await this.customerdetailRepository.find()
          if(!users){
           throw new Error('There is no user in the database')
          }
          return users
      }
     /* async createuser(dto: Partial<User>){
            const user =await this.customerdetailRepository.save(dto)
            console.log(user)
            return user
      }*/
    async update(dto:UpdatecustomerDetailDto,@Request() req): Promise<User> {
      const userId=req.user.id
      const existingUser = await this.get(userId);
      if (!existingUser) {
        throw new Error(`User with mobile number ${userId} not found`);
      }
      Object.assign(existingUser, dto); 
      const updatedUser = await this.customerdetailRepository.save(existingUser);
  
      return updatedUser;
    }
   async findbymobileno(mobileno:number){
          const querybuilder=await this.customerdetailRepository.createQueryBuilder("user")
          .where("mobileno = :mobileno", {mobileno })
          .getOne();
          return querybuilder
   }
    async get(userid:number){
        const users= this.customerdetailRepository.findOne({
            where:{userid:userid},
            select:['userid','fullName','address','fcmtoken']
          })
          if(!users){
            throw new Error(`User with userid ${userid} not found`)
          }
          return users
    }
    async updateUserFCMToken(userId, fcmToken) {
      try {
          const user = await this.get(userId);
          if (!user) {
              throw new Error("User not found");
          }
          user.fcmtoken = fcmToken;
          await this.customerdetailRepository.save(user)   
          return "FCM token updated successfully";
      } catch (error) {
          throw error;
      }
  }

}
