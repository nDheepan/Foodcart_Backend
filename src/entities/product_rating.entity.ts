import { Rating } from "src/entities/rating.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import DealerMenu from "./dealer_product.entity";

@Entity()
export class ProductRating {
 
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product_star:number;

    @Column({type:"varchar",length:255})
    comments:string;

   
    
    @ManyToOne(()=>Rating,(rating)=>rating.product_rating)
    rating:Rating;

    @ManyToOne(()=>DealerMenu,(product)=>product.product_rating)
    product:DealerMenu;


}
