import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DealerMenu from "./dealer_product.entity";
import Dealer_Entity from "./dealer_detail.entity";

@Entity()
export class ProductsIngredient {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string; 

    @ManyToMany(()=>DealerMenu,(product)=>product.ingredient)
    @JoinTable()
    product:DealerMenu[];

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.ingredient)
    dealer:Dealer_Entity;
}
