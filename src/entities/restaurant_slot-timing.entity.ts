import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";

@Entity()
export class RestaurantSlotTiming {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",length:255})
    from_time:string;

    @Column({type:"varchar",length:255})
    to_time:string;

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.slot)
    dealer:Dealer_Entity;



}
