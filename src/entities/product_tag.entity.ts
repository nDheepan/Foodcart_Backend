import DealerMenu from "src/entities/dealer_product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";

@Entity()
export class ProductTag {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToMany(()=>DealerMenu,(product)=>product.foodtag)
    @JoinTable()
    product : DealerMenu[];

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.foodtag)
    dealer:Dealer_Entity;


}
