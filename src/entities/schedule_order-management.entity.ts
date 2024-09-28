import Dealer_Entity from "src/entities/dealer_detail.entity";
import { OrderItem } from "src/entities/order-item.entity";
import OrderManagement from "src/entities/order-management.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { status } from "../enum/deliverystatus.enum";

@Entity()
export class ScheduleOrderManagement {

    @PrimaryGeneratedColumn()
    id:number;

  /*  @ManyToOne(()=>User,(user)=>user.scheduleOrder)
    user:User;    */

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.scheduleorder)
    dealer:Dealer_Entity;  

    @Column({type:"varchar",length:255})
    delivery_date:string;

    @Column({type:"varchar",length:255})
    delivery_time:string;

    @Column({type:"double precision",default:null})
    total:number;

    @Column({type:"varchar",length:255,default:status.PENDING})
    delivery_status:string;

    @Column({type:"varchar",length:255})
    order_instruction:string;

    @Column({type:"varchar",length:255})
    deliver_to:string;
       
    @CreateDateColumn({type:"timestamp"})
    created_at:Date;
    
    @CreateDateColumn({type:"timestamp"})
    cancelled_at:Date;

    @CreateDateColumn({type:"timestamp"})
    modified_at:Date;

    @OneToMany(()=>OrderItem,(item)=>item.scheduleOrder)
    item:OrderItem[];


  
    

}
