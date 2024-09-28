import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderItemDto } from '../../../dtos/create-order-item.dto';
import { UpdateOrderItemDto } from '../../../dtos/update-order-item.dto';
import { OrderItem } from '../../../entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(@InjectRepository(OrderItem)
  private itemRepo:Repository<OrderItem>
  ){}
  async create(createOrderItemDto: CreateOrderItemDto) {
    
    const result = await this.itemRepo.save(createOrderItemDto);
    if(result){return result}
    else{throw new BadRequestException()}

  }
  async findAll(id:string) {
      const result = await this.itemRepo.createQueryBuilder("item")
                    .leftJoin("item.order","order")
                    .where("order.id = :id",{id:id})
                    .leftJoin("item.product","product")
                    .select(["item.item_qty","product.name","product.price"])
                    .getMany();
                    if(result.length != 0){
    return result;}
    else{throw new BadRequestException()}
  }

  async  findOne(id: number) {
    const result = await this.itemRepo.createQueryBuilder("item")
                   .getOne();
    if(!result){throw new BadRequestException()}
    else{return result;}
 }
  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const result =await this.itemRepo.update(id,updateOrderItemDto);
    if(!result){throw new BadRequestException()}
    else{return result}
  }

  async remove(id: number) {
    
    const result = await this.itemRepo.createQueryBuilder("item")
                   .where("item.id = :",{id:id})
                   .getOne();
    if(result){return result}
    else{
    return `This action removes not a #${id} orderItem`;
  }
 
}}
