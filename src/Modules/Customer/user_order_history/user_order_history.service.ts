import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OrderManagement from 'src/entities/order-management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserOrderHistoryService {
    constructor(
        @InjectRepository(OrderManagement)
          private  orderRepository:Repository<OrderManagement>
    ){}

    async orderhistory(@Req() req):Promise<OrderManagement[]>{
        const userid=req.user.id
          const orders = await this.orderRepository.createQueryBuilder('order')
              .leftJoinAndSelect('order.user', 'user')
              .leftJoinAndSelect('order.item', 'item')
              .leftJoinAndSelect('item.product','product')
              .where('user.userid = :userid', { userid: userid })
              .andWhere('order.deliverystatus != :deliverystatus',{deliverystatus: 'pending'})
              .andWhere('order.deliverystatus NOT IN (:...statuses)', { statuses: ['pending', 'cancelled'] })
              .select(['order.id', 'order.total', 'order.userid', 'order.deliverystatus', 'item.id','item.item_qty',
                       'product.name','product.price','product.gst','product.packagecharge']) 
              .getMany();
          return orders;
    }
}

