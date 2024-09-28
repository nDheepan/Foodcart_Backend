import { BadRequestException, Injectable, InternalServerErrorException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateOrderManagementDto } from '../../../dtos/create-order-management.dto';
import { UpdateOrderManagementDto } from '../../../dtos/update-order-management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import OrderManagement from '../../../entities/order-management.entity';
import { Repository } from 'typeorm';
import { status } from 'src/enum/deliverystatus.enum';
import { NotificationsService } from 'src/Modules/notifications/notifications.service';
import { Role } from 'src/enum/role.enum';
import { error } from 'node:console';

@Injectable()
export class OrderManagementService {
  constructor(
  @InjectRepository(OrderManagement)
  private useRepository:Repository<OrderManagement>,
  private readonly notificationService:NotificationsService
  ){}
 
  async create(createOrderManagementDto: CreateOrderManagementDto) {
    createOrderManagementDto.deliverystatus = status.PENDING;
    const result =await this.useRepository.save(createOrderManagementDto);
          if(result){return result}
          else{throw new BadRequestException()}
  }

  async findAll() {
    const result = await this.useRepository.find();
          if(result){return result}
          else{throw new BadRequestException()}
  }

  async findOne(id: string) {
    
    const queryBuilder = await this.useRepository.createQueryBuilder("orderrepo")
    const result = await queryBuilder
                   .where("orderrepo.id = :id",{id:id})
                   .leftJoinAndSelect("orderrepo.dealer","dealer")
                   .leftJoinAndSelect("orderrepo.item","item")
                   .leftJoinAndSelect("orderrepo.user","user")
                   .innerJoinAndSelect("item.product","product")
                   .getRawOne();
          if(result){return result;}
          else{throw new BadRequestException()}
    }

  async pdate(id: string, updateOrderManagementDto: UpdateOrderManagementDto) {
    const result = await this.useRepository.update(id,updateOrderManagementDto);
        if(result){return result}
        else{throw new BadRequestException()}
  }

  async remove(id: string) {
    const order = await this.useRepository.createQueryBuilder("order")
                  .where("order.id = :id",{id:id})
                  .getOne();
        if(!order){throw new UnauthorizedException("No particular order found")}
        else{const result = await this.useRepository.remove(order);
        if(result){return result;}
        else{throw new BadRequestException()}
        }
  }

  async getuserPOrders(userid:string,dealerid:string){
    const result = await this.useRepository.createQueryBuilder("order")
                   .where("order.dealer = :dealerid",{dealerid:dealerid})
                   .andWhere("order.user = :userid",{userid:userid})
                   .select("COUNT(order.id)","orderid")
                   .getRawOne();
    if(!result){throw new Error()}
    else{
      return {message:"order retrive successfully",result:result.orderid }
    }

  }
  
async orderUpdate(id:string,updateManagementDto:UpdateOrderManagementDto){


  const queryBuilder = await this.useRepository.createQueryBuilder("order");
  const result = await queryBuilder
  .where("order.id = :id",{id:id})
  .leftJoin("order.item","item")
  .innerJoin("item.product","product")
  .select(["product.name","item.item_qty","product.price","item.item_qty * product.price"])
  .groupBy("order.id,item.id,product.id")
  .getRawMany();
    
  let output = 0;
  result.forEach(row =>{
     output +=row.tot;
  })

 const r1 = await this.useRepository.update(id,{deliverystatus:status.PROCESS})
 const r2 = await this.useRepository.update(id,{total:output});
 const r3 = await this.useRepository.update(id,{modified_at:new Date()})
  if(r1 && r2 && r3){return {message:"order details were updated"}}
  else{throw new  BadRequestException("some data's are not updated")}
    }


async orderNotify(orderid:string,dealerid:string){
  const result  = await this.getorder(orderid);
      if(result){return result;}
      else{throw new BadRequestException()}
} 

async assignOrder(id:string,updateOrderManagementDto:UpdateOrderManagementDto){
  await this.useRepository.update(id,{dealer:updateOrderManagementDto.dealer})
  const result= await this.useRepository.update(id,{deliverystatus:status.DEALERCONFIRMATION})
  const orders = await this.getorder(id);
          if(result){
            return {message:"order deatils found",orders}
          }
          else{
            throw new BadRequestException();
          }
}

async assignAgentOrder(id:string,updateOrderManagementDto:UpdateOrderManagementDto){
    await this.useRepository.update(id,{agent:updateOrderManagementDto.agent})
    const result= await this.useRepository.update(id,{deliverystatus:status.AGENTCONFIRMATION})
          if(result){
            return result;
          }
          else{
            throw new UnauthorizedException();
          }
}
async get(id:string){
   //const order = await this.useRepository.findOne({where:{id:id},relations:['dealer']})
  // console.log(order)
  const order = await this.useRepository.createQueryBuilder("order")
                .where("order.id = :id",{id:id})
                .leftJoinAndSelect("order.dealer","dealer")
                .getRawOne();
   return order;
}
async getorder(id:string){
  const order= await this.useRepository.createQueryBuilder('order')
    .leftJoin('order.item','item')
    .leftJoin('order.dealer','dealer')
    .leftJoin('order.user','user')
    .leftJoin('item.product','product')
    .where('order.id = :id',{id:id})
    .select(['item.item_qty','order.id','order.total','product.price','product.name',
             'dealer.restaurant_name','dealer.id','order.order_instruction','order.deliverystatus','user.userid','user.fullName'])
    .getOne()
    if (order) {
     order.item.forEach((item) => {
         item.product.price = item.item_qty * item.product.price;
      });
  }
  return order
}

async update(id:string,updateOrderManagementDto:UpdateOrderManagementDto){

  const result = await this.useRepository.update(id,updateOrderManagementDto)
        if(result.affected > 0){return result}
        else{throw new BadRequestException()}
}
}