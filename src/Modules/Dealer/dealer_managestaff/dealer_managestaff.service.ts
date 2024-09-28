import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDealerManagestaffDto } from '../../../dtos/create-dealer_managestaff.dto';
import { UpdateDealerManagestaffDto } from '../../../dtos/update-dealer_managestaff.dto';
import { Repository } from 'typeorm';
import { DealerManagestaff } from '../../../entities/dealer_managestaff.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DealerManagestaffService {
  constructor (
    @InjectRepository(DealerManagestaff)
    private readonly manageStaffRepo:Repository<DealerManagestaff>){}
    async create(createDealerManagestaffDto: CreateDealerManagestaffDto) {
    return this.manageStaffRepo.save(createDealerManagestaffDto);
  }

  async  findAll(dealerid:number) {

    const result = await this.manageStaffRepo.createQueryBuilder("managestaff")
                  .where("managestaff.dealer = :dealerid",{dealerid:dealerid})
                  .getMany();  
          if(!result){throw new BadRequestException()}
          else{return result;}
  }

 async  findOne(id: number) {
    const manageStaffQuerryBuilder = await this.manageStaffRepo.createQueryBuilder("managestaff");
    const result = await manageStaffQuerryBuilder
                  .where("managestaff.id = :id",{id:id})
                  .getMany();
          if(!result){throw new BadRequestException()}
          else{return result;}  
  }

  async update(id: number, updateDealerManagestaffDto: UpdateDealerManagestaffDto) {
    const result = await this.manageStaffRepo.update(id,updateDealerManagestaffDto);
          if(!result){throw new BadRequestException()}
          else{return result;}  
  }

  async remove(id: number) {
    const manageStaffQuerryBuilder = await this.manageStaffRepo.createQueryBuilder("managestaff");
    const result = await manageStaffQuerryBuilder
                  .where("managestaff.id = :id",{id:id})
                  .getMany();
          if(!result){}
          else{
            return this.manageStaffRepo.remove(result);
          }  
  }

  async getUser(mobile:number){
    const user = await this.manageStaffRepo.createQueryBuilder("managestaff")
                               .where("managestaff.mobile = :mobile",{mobile:mobile})
                               .getMany();
          if(!user){throw new UnauthorizedException("No user found")}
          else{return user;}
  }

}