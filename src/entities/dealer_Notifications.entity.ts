import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";

@Entity()
class DealerNotifications {
   
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar",length:255})
  reason:string;

  @Column({type:"integer"})
  timetake:number;
 
  @CreateDateColumn({type:"timestamp"})
  created_at:Date;

  @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.dealernotifications)
  dealer:Dealer_Entity;



  
   }
export default DealerNotifications