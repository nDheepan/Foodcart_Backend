import { IsOptional } from "class-validator";
import Dealer_Entity from "src/entities/dealer_detail.entity";
import { ProductRating } from "src/entities/product_rating.entity";
import OrderManagement from "src/entities/order-management.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./customer_detail.entity";

@Entity()
export class Rating {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    dealer_star:number;

    @Column()
    comments:string;

   
    @Column({type:'varchar',length:255,default:null})
    complient:string;

    @ManyToOne(()=>Dealer_Entity ,(dealer)=>dealer.rating)
    dealer:Dealer_Entity;
   
    @ManyToOne(()=>User,(user)=>user.rating)
    user:User;

    @ManyToOne(()=>OrderManagement,(order)=>order.rating)
    order:Rating;
    
    @OneToMany(()=>ProductRating,(product_rating)=>product_rating.rating)
   product_rating:ProductRating[]

}
