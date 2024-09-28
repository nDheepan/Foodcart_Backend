import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import OrderManagement from "./order-management.entity";
import DealerMenu from "src/entities/dealer_product.entity";
import { ScheduleOrderManagement } from "src/entities/schedule_order-management.entity";

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    item_qty:number;
    @ManyToOne(()=>OrderManagement,(order)=>order.item)
    order:OrderManagement;
     
    @ManyToOne(()=>DealerMenu,(product)=>product.item)
    product:DealerMenu;

    @ManyToOne(()=>ScheduleOrderManagement,(scheduleOrder)=>scheduleOrder.item)
    scheduleOrder:ScheduleOrderManagement;
   }
