import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminInfoDto } from '../../../dtos/create-admin_info.dto';
import { UpdateAdminInfoDto } from '../../../dtos/update-admin_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminInfo } from '../../../entities/admin_info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminInfoService {
  constructor(@InjectRepository(AdminInfo)
    private readonly adminRepo:Repository<AdminInfo>){}
  create(createAdminInfoDto: CreateAdminInfoDto) {
    return this.adminRepo.save(createAdminInfoDto);
  }

  async findAll() {
    
    const queryBuilderAdmin = await this.adminRepo.createQueryBuilder("admin")
    const result = await queryBuilderAdmin
                   .getMany();

    return result;

  }

 async findOne(id: number) {

    const queryBuilderAdmin = await this.adminRepo.createQueryBuilder("admin")
    const result = await queryBuilderAdmin
                  .where("where = :id",{id:id})
                  .getOne();
    return result;                  
  }

  async update(id: number, updateAdminInfoDto: UpdateAdminInfoDto) {
    return this.adminRepo.update(id,updateAdminInfoDto);
  }

  async remove(id: number) {
    const queryBuilderAdmin = await this.adminRepo.createQueryBuilder("admin")
    const result = await queryBuilderAdmin
                  .where("where = :id",{id:id})
                  .getOne();
    if(!result){throw new UnauthorizedException("")}
    else{
    return this.adminRepo.remove(result);         
    }   
  }
}
