import { Injectable, NotFoundException, Req, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DealerProductsService } from 'src/Modules/Dealer/dealer_products/dealer_products.service';
import { NotificationsService } from 'src/Modules/notifications/notifications.service';
import { OrderItem } from 'src/entities/order-item.entity';
import OrderManagement from 'src/entities/order-management.entity';
import { cancel, status } from 'src/enum/deliverystatus.enum';
import { Role } from 'src/enum/role.enum';
import { Repository } from 'typeorm';


@Injectable()
export class CustomerOrderService {
    constructor(
        @InjectRepository(OrderManagement)
         private orderRepository:Repository<OrderManagement>,
        private readonly dealerproductService:DealerProductsService,
        @InjectRepository(OrderItem)
          private orderitemRepository:Repository<OrderItem>,
        private readonly notificationService:NotificationsService  
    ){}
   async addOrders(orderdata:any,@Req() req){
      let totalprice=0,price=0,productid,orderid,dealerid
      let orderedProduct = []
      //json data
      const Items = Object.values(orderdata);
       console.log(Items)
       const userid=req.user.id
       console.log(userid)
        //order item creation and find out the total price and quantity
          const orderitem=Items.map(async(item:any)=>{
           const dealerproducts=await this.dealerproductService.getAll()
           const products=dealerproducts.find((product:any)=>product.name=== item.name)
           console.log(products) 
           if (products) {  
            price=(products.price*item.quantity)+products.gst+products.packagecharge
            console.log('Price:',price)
            productid=products.id
            dealerid=products.dealer.id
            orderedProduct.push({
              name: products.name,
              image:products.images,
              price:products.price,
              gst:products.gst,
              packagecharge:products.packagecharge,
            }); 
             const orderItem=await this.orderitemRepository.create({
               item_qty:item.quantity,
               product:productid                  
             })       
             totalprice +=price
             console.log(orderItem)     
             return orderItem
           }
         });
         //order items 
         const orderItems = await Promise.all(orderitem);
         console.log(orderItems)
         //create the order
        const order = await  this.orderRepository.create({
          user:userid,
          order_instruction:'deliver on the mentioned time',
          deliverystatus:status.PENDING,
          total:totalprice,
         dealer:dealerid
      }) 
       //order.dealer=dealerid 
      const orders= await this.orderRepository.save(order);
     console.log(orders)
     // find each order item with the order and save them
     orderid=order.id
       await Promise.all(
         orderItems.map(async(orderitem)=>{
           orderitem.order=orderid
           await this.orderitemRepository.save(orderitem)  
         })
       )
       console.log(orderItems)
     //notification send for the user  
          await this.notificationService.sendNotification(
             'Order Placed',`Your Order ${orderedProduct.map(products => products.name)} is placed Successfully`,Role.USER,userid)         
       return {orders,orderedProduct}
    }
  
  //cancel orders
    async cancelOrder(id: number,@Req() req) {
      const userid=req.user.id
     const order = await this.orderRepository.findOne({
       where: { id: id, user: userid }, 
     });
     if (!order) {
       throw new NotFoundException(`Order with ID ${id} not found.`);
     }
     const dealerid=order.dealer.id
     const currentTime = new Date();
     const orderTime = order.created_at; 
     const timeDiff = (currentTime.getTime() - orderTime.getTime()) / (1000 * 60); 
     if (timeDiff < 2 && order.deliverystatus==='pending') {
     order.deliverystatus = status.CANCELLED;
     order.cancelledBy=cancel.USER;
     order.cancellation=true
     await this.orderRepository.save(order);
     await this.notificationService.sendNotification('Order Cancelled',`You Cancelled the Order`,Role.USER,userid)
     await this.notificationService.sendNotification('Order cancel',`Order ${order.id} is cancelled`,Role.DEALER,dealerid.toString())
     return { message: 'Order cancelled by the user' };
     }
     else if(order.deliverystatus==='confirmed'){
       return {message:'Order is confirmed by the restaurant'}
   }
     else if(timeDiff >2 && order.deliverystatus==='confirmed'){
        return {message:'You should not cancel the order after2 minutes of placing order or the order is confirmed by the restauramt'}
     }
     else if(timeDiff > 2){ 
       return { message: 'Order cannot be cancelled as more than 2 minutes have passed since placing the order' }; 
   }
   else{
      return{message:'Order is already cancelled by the user'}
   }
 }
 async reorder(@Req() req,id:number){
  const user=req.user
  const previousorder=await this.orderRepository.findOne({
    where:{
      user:user.id,
      id:id
    },
    relations:['item']
  })
    console.log(previousorder)
    if(!previousorder){
      throw new NotFoundException('Previous order is not found')
    }
    const neworder=this.orderRepository.create({
      user: user.id,
      order_instruction: 'deliver on the mentioned time',
      deliverystatus: status.PENDING,
      total: previousorder.total,
      dealer: previousorder.dealer,
      item: previousorder.item.map(item => ({
        product: item.product,
        item_qty: item.item_qty,
      }))
    })
      return this.orderRepository.save(neworder)
 }
 
}



















