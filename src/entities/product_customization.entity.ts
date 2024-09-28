import DealerMenu from "src/entities/dealer_product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";

@Entity()
export class ProductCustomization {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column()
    price:number;

    @ManyToMany(() => DealerMenu, product => product.customization)
    @JoinTable()
    product: DealerMenu[];

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.customization)
    dealer:Dealer_Entity;

}
