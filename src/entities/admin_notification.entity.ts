import Dealer_Entity from "src/entities/dealer_detail.entity";
import {  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminInfo } from "./admin_info.entity";
@Entity()
export class AdminNotification {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    message:string;

    @CreateDateColumn({type:"timestamp"})
    created_at:Date;

  @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.notification)
    dealer:Dealer_Entity;


    @ManyToOne(()=>AdminInfo,(admin)=>admin.notification)
    admin:AdminInfo;

    
}
