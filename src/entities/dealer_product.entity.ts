import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";
import { join } from "path";
import { OrderItem } from "src/entities/order-item.entity";
import { Rating } from "src/entities/rating.entity";
import { Category } from "./category.entity";
import { ProductRating } from "./product_rating.entity";
import { ProductAddOn } from "./product_add-on.entity";
import { ProductsIngredient } from "./products_ingredient.entity";
import { ProductTag } from "./product_tag.entity";
import { ProductCustomization } from "src/entities/product_customization.entity";

@Entity()
class DealerMenu {

    
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type:"varchar",length: 255, })
  name: string;

  @Column({ type:"varchar",length: 255 })
  desc: string;

  @Column({ type:"varchar",length: 255 })
  spicylevel: string;

  @Column({ type:"integer"})
  servepeople: number;

  @Column({type:"double precision"})
  price: number;

  @Column({type:"double precision"})
  gst: number;

  @Column({type:"double precision",default:null})
  packagecharge: number;
 
  @Column({ default: true })
  is_available: boolean;

  @Column({type:"text",default:null})
  images:string;

  @Column({type:"text",default:null})
  shorts:string;

  @Column({type:"double precision",default:null})
  ratings:number;

  @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.product)
  dealer:Dealer_Entity;

  @OneToMany(()=>OrderItem,(item)=>item.product)
  item:OrderItem[];
  
  @OneToMany(()=>Category,(category)=>category.dealermenu)
  category:Category[];

  @OneToMany(()=>ProductRating,(product_rating)=>product_rating.product,)
  product_rating:ProductRating[];

  @ManyToMany(() => ProductAddOn,(addons)=>addons.product)
  @JoinTable()
  addons: ProductAddOn[];

  @ManyToMany(()=>ProductsIngredient,(ingredient)=>ingredient.product)
  @JoinTable()
  ingredient:ProductsIngredient[];

  @ManyToMany(()=>ProductTag,(foodtag)=>foodtag.product)
  @JoinTable()
  foodtag:ProductTag[];

  @ManyToMany(() => ProductCustomization,(customization)=>customization.product)
  @JoinTable()
  customization: ProductCustomization[];
 
    }
export default DealerMenu