import Dealer_Entity from "src/entities/dealer_detail.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromoOffers {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",length:255})
    provider:string;

    @Column({type:"varchar",length:255})
    promoname:string;

    @Column({type:"varchar",length:255})
    coupon_code:string;

    @Column({type:"varchar",length:255})
    description:string;

    @Column({type:"varchar",length:255})
    instruction:string; 
    
    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.coupon)
    dealer:Dealer_Entity;

}
