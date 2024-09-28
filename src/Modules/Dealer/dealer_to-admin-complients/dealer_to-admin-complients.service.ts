import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDealerToAdminComplientDto } from '../../../dtos/create-dealer_to-admin-complient.dto';
import { UpdateDealerToAdminComplientDto } from '../../../dtos/update-dealer_to-admin-complient.dto';
import { DealerToAdminComplient } from '../../../entities/dealer_to-admin-complient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DealerToAdminComplientsService {
  constructor (@InjectRepository(DealerToAdminComplient)
  private readonly dealerComplientsRepo : Repository<DealerToAdminComplient>
  ){}
  async create(createDealerToAdminComplientDto: CreateDealerToAdminComplientDto) {
    return this.dealerComplientsRepo.save(createDealerToAdminComplientDto)
  }

  async findAll() {
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients")
    const result =  await querybuilder 
                    .getMany();
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    }
   }

  async findOne(id: string) {
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients")
    const result =  await querybuilder 
                    .where("dealercomplients.id = :id",{id:id})
                    .getMany();
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    }  }

  async update(id: string, updateDealerToAdminComplientDto: UpdateDealerToAdminComplientDto) {
    return this.dealerComplientsRepo.update(id,updateDealerToAdminComplientDto);
  }

  async remove(id: string) {
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients")
    const result =  await querybuilder 
                    .where("dealercomplients.id = :id",{id:id})
                    .getMany();
    if(!result){throw new UnauthorizedException()}
    else{
    return this.dealerComplientsRepo.remove(result);
    }  
  }



  async getAll(id:any){

    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients");
    const result = await querybuilder
                   .leftJoin("dealercomplients.admin","admin")
                   .where("dealercomplients.admin = :id",{id:id})
                   .select("dealercomplients.id","complientid")
                   .addSelect("dealercomplients.title","title")
                   .addSelect("dealercomplients.message","complient")
                   .addSelect(`DATE(dealercomplients.created_at)`,"date")
                   .getRawMany();
  if(!result){
    throw new UnauthorizedException()
  }
  else{
    return result;
  }
   }


  async getDay(id:any){
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients");
    const today = new Date()
    const result = await querybuilder
                    .leftJoin("dealercomplients.admin","admin")
                    .andWhere('DATE(dealercomplients.created_at) = Dtae(:today)',{today:today})
                    .where("admin.id = :id",{id:id})
                    .select("dealercomplients.id","complientid")
                    .addSelect("dealercomplients.title","title")
                    .addSelect("dealercomplients.message","complient")
                    .addSelect(`DATE(dealercomplients.created_at)`,"date")
                    .getRawMany();
    if(!result){
      throw new UnauthorizedException()
    }
    else{
      return result;
    }
    }

  async getWeek(id:any){
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients");
    const last7days = new Date()
    last7days.setDate(last7days.getDate() - 7)      
    const result = await querybuilder
                     .leftJoin("dealercomplients.admin","admin")
                     .andWhere('DATE(dealercomplients.created_at) >= :last7days',{last7days:last7days})
                     .where("admin.id = :id",{id:id})
                     .select("dealercomplients.id","complientid")
                     .addSelect("dealercomplients.title","title")
                     .addSelect("dealercomplients.message","complient")
                     .addSelect(`DATE(dealercomplients.created_at)`,"date")
                     .getRawMany();
    if(!result){
      throw new UnauthorizedException()
    }
    else{
      return result;
    }
    }

  async getMonth(id:any){
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients");
    const last30days = new Date()
    last30days.setDate(last30days.getDate() -30)      
    const result = await querybuilder
                   .leftJoin("dealercomplients.admin","admin")
                   .andWhere('DATE(dealercomplients.created_at) >= :last30days',{last30days:last30days})
                   .where("admin.id = :id",{id:id})
                   .select("dealercomplients.id","complientid")
                   .addSelect("dealercomplients.title","title")
                   .addSelect("dealercomplients.message","complient")
                   .addSelect(`DATE(dealercomplients.created_at)`,"date")
                   .getRawMany();
  if(!result){
    throw new UnauthorizedException()
  }
  else{
    return result;
  }
   }


  async getDate(id:any,date:string){
    const querybuilder = await this.dealerComplientsRepo.createQueryBuilder("dealercomplients");
    const result = await querybuilder
                   .leftJoin("dealercomplients.admin","admin")
                   .andWhere('DATE(dealercomplients.created_at) = DATE(:date)',{date:date})
                   .where("admin.id = :id",{id:id})
                   .select("dealercomplients.id","complientid")
                   .addSelect("dealercomplients.title","title")
                   .addSelect("dealercomplients.message","complient")
                   .addSelect(`DATE(dealercomplients.created_at)`,"date")
                   .getRawMany();
  if(!result){
    throw new UnauthorizedException("no rating found")
  }
  else{
    return result;
  }
   }



  }
