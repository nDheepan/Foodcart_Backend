import { Column, CreateDateColumn, Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderManagement from "./order-management.entity";

@Entity()
 class Payment{
    @PrimaryGeneratedColumn({type:'bigint'})
      transcationid:string
    @Column({type:'varchar',length:255})
       payment_method:string  
    @Column({type:'double precision'})
       amount:number
    @Column({type:'varchar',length:255})
       payment_status:string
    @CreateDateColumn({type:'timestamp without time zone'})
       created_at:Date
    @UpdateDateColumn({type:'timestamp without time zone'})
       updated_at:Date     
    @OneToOne(()=>OrderManagement,(order)=>order.payment)
    @JoinColumn()
       order:OrderManagement;
    // @ManyToOne(()=>ScheduleOrderManagement,scheduleorder=>scheduleorder.payment) 
    //   scheduleorder:ScheduleOrderManagement  
          
 }
 export default Payment