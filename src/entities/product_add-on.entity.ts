import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DealerMenu from "./dealer_product.entity";
import Dealer_Entity from "./dealer_detail.entity";

@Entity()
export class ProductAddOn {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",length:255})
    name:string;

    @Column({type:"double precision"})
    price:number;

    @ManyToMany(() => DealerMenu, product => product.addons)
    @JoinTable()
    product: DealerMenu[];

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.addons)
    dealer:Dealer_Entity;

}
