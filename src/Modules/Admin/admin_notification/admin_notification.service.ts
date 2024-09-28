import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminNotificationDto } from '../../../dtos/create-admin_notification.dto';
import { UpdateAdminNotificationDto } from '../../../dtos/update-admin_notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminNotification } from '../../../entities/admin_notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminNotificationService {
  constructor(@InjectRepository(AdminNotification)
    private readonly notificationRepo:Repository<AdminNotification>){}
    async create(createAdminNotificationDto: CreateAdminNotificationDto) {
      return this.notificationRepo.save(createAdminNotificationDto)
    }

    async findAll() {
      const querybuilder = await this.notificationRepo.createQueryBuilder("notification");
      const result = await querybuilder 
                    .getMany();
      return result;
    }

  async  findOne(id: number) {
      const querybuilder = await this.notificationRepo.createQueryBuilder("notification");
      const result = await querybuilder 
                    .where("notification.id = :id",{id:id})
                    .getOne();
      if(!result){throw new UnauthorizedException("not specific notification found")}
      return result;
  }

  async update(id: number, updateAdminNotificationDto: UpdateAdminNotificationDto) {
      return this.notificationRepo.update(id,updateAdminNotificationDto)
  }

  async   remove(id: number) {
      const querybuilder = await this.notificationRepo.createQueryBuilder("notification");
      const result = await querybuilder 
                    .where("notification.id = :id",{id:id})
                    .getOne();
      if(!result){throw new UnauthorizedException("No any notification found")}
      return result;  }

  async getNotification(id:number){

    const dealer = await this.notificationRepo.findOne({where:{id:id}});
    if(!dealer){throw new UnauthorizedException("No any notification found")}
    else{
    const querybuilder = await this.notificationRepo.createQueryBuilder("notification");
    const result = await querybuilder 
                   .where("notification.dealer = :id",{id:id})
                   .select("notification.title","title")
                   .addSelect("notification.message","message")
                   .addSelect("notification.created_at","time")
                   .getRawMany();
    if(!result){throw new UnauthorizedException("No any notification found")}
    return result;  }
}

  async getOneNotification(id:number,notificationid:number){

    const dealer = await this.notificationRepo.findOne({where:{id:id}});
    if(!dealer){throw new UnauthorizedException("No any notification found")}
    else{
    const querybuilder = await this.notificationRepo.createQueryBuilder("notification");
    const result = await querybuilder 
                  .where("notification.dealer = :id",{id:id})
                  .andWhere("notification.id = :notificationid",{notificationid:notificationid})
                  .select("notification.title","title")
                  .addSelect("notification.message","message")
                  .addSelect("notification.created_at","time")
                  .getRawOne();
    if(!result){throw new UnauthorizedException("No any notification found")}
    return result;  }
}

  }

