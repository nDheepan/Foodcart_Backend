import { Injectable, UseGuards } from '@nestjs/common';
import { CreateScheduleOrderManagementDto } from '../../../dtos/create-schedule_order-management.dto';
import { UpdateScheduleOrderManagementDto } from '../../../dtos/update-schedule_order-management.dto';
import { Repository } from 'typeorm';
import { ScheduleOrderManagement } from '../../../entities/schedule_order-management.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { status } from '../../../enum/deliverystatus.enum';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Injectable()
export class ScheduleOrderManagementService {
  constructor(@InjectRepository(ScheduleOrderManagement)
    private readonly scheduleRepository:Repository<ScheduleOrderManagement>){}
  async create(createScheduleOrderManagementDto: CreateScheduleOrderManagementDto) {
    
    return this.scheduleRepository.save(createScheduleOrderManagementDto);
  }

  async findAll() {
   
    const queryBuilder = await this.scheduleRepository.createQueryBuilder("schedule")
    const result = await queryBuilder
                   .getMany()
    return result;
         
  }

  async findOne(id: number) {
    const queryBuilder = await this.scheduleRepository.createQueryBuilder("schedule")
    const result = await queryBuilder
                   .where("schedule.id = :id",{id:id})
                   .getMany();
    if(!result){
      return result;
    }
    else{
    return result;
  }
  }


  async update(id: number, updateScheduleOrderManagementDto: UpdateScheduleOrderManagementDto) {
    return this.scheduleRepository.update(id,updateScheduleOrderManagementDto)
  }

  async remove(id: number) {
    const queryBuilder = await this.scheduleRepository.createQueryBuilder("schedule")
    const result = await queryBuilder
                   .where("schedule.id = :id",{id:id})
                   .getMany();
    if(!result){
      return this.scheduleRepository.remove(result);
    }
    else{
    return result;
  }  }


  async updateOrder(id:number,updateScheduleOrder:UpdateScheduleOrderManagementDto){
    
    const queryBuilder = await this.scheduleRepository.createQueryBuilder("scheduleorder");

    const result = await queryBuilder
                         .where("scheduleorder.id = :id",{id:id})
                         .leftJoin("scheduleorder.item","item")
                         .innerJoin("item.product","product")
                         .select("item.item_qty * product.price","total")
                         .groupBy("item.id,product.id,scheduleorder.id")
                         .getRawMany();
                         
                         let output = 0;

                      console.log(result)
                         result.forEach(row => {
                          output +=row.total;
                          });
                        await this.scheduleRepository.update(id,{delivery_status:status.PROCESS});
                        await this.scheduleRepository.update(id,{modified_at:new Date()})
                        await this.scheduleRepository.update(id,{total:output});
    return this.scheduleRepository.findOne({where:{id:id}});

  }
  async assignOrder(id: number, updateScheduleOrderManagementDto: UpdateScheduleOrderManagementDto) {
    await this.scheduleRepository.update(id,updateScheduleOrderManagementDto)
    return this.scheduleRepository.update(id,{delivery_status:status.DEALERCONFIRMATION})

  }

}
