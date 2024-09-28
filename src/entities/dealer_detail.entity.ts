import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import DealerProducts from "./dealer_product.entity";
import DealerMenu from "./dealer_product.entity";
import OrderManagement from "./order-management.entity";
import { Rating } from "src/entities/rating.entity";
import { AdminNotification } from "src/entities/admin_notification.entity";
import { DealerManagestaff } from "./dealer_managestaff.entity";
import { DealerToAdminComplient } from "./dealer_to-admin-complient.entity";
import { ScheduleOrderManagement } from "src/entities/schedule_order-management.entity";
import { PromoOffers } from "src/entities/promo-offer.entity";
import DealerNotifications from "./dealer_Notifications.entity";
import { RestaurantSlotTiming } from "./restaurant_slot-timing.entity";
import { ProductCustomization } from "./product_customization.entity";
import { ProductTag } from "./product_tag.entity";
import { ProductAddOn } from "./product_add-on.entity";
import { ProductsIngredient } from "./products_ingredient.entity";
@Entity()
class Dealer_Entity{

       @PrimaryGeneratedColumn()
       id:number;


       @Column("varchar",{length:255})
       username:string;

       @Column({type:"varchar",length:255})
       user_address:string;

       @Column({type:"bigint"})
       user_mobile:number;

       @Column("varchar",{length:255})
       restaurant_name:string;

       @Column("varchar",{length:255})
       cuisine:string;

       @Column({type:"varchar",length:255})
       restaurant_type:string;
      
       @Column("varchar",{length:255})
       restaurant_category:string;
      
       @Column({type:"varchar",length:255})
       restaurant_address:string;
      
       @Column({type:"bigint"})
       restaurant_mobileno:number;
      
       @Column({type:"varchar",length:255})
       password:string;   
       
       @Column("varchar",{length:255})
       emailid:string;
       
       @Column({type:"varchar",length:30})
       opens_at:string;
       
       @Column({type:"varchar",length:30})
       closes_at:string;
       
       @Column({type:"varchar",length:255})
       days_available:string;             
       
       @Column("varchar",{length:255})
       latitude:string;
       
       @Column({type:"varchar",length:255})
       longitude:string;     
       
       
       
       @CreateDateColumn({ type: 'timestamp' })
       created_at: Date;
       
     
       @Column({type:"varchar",length:255})
       name_pan:string;
       
       @Column({type:"varchar",length:255})
       no_pan:string;
       
       @Column({type:"varchar",length:255})
       address_pan:string;
       
       @Column({type:"varchar",length:255})
       no_gst:string;
       
       @Column({type:'bigint'})
       no_fssai:number;
       
       @Column({type:"varchar",length:100})
       expdate_fssai:string;
       
       @Column({type:"varchar",length:255,default:null})
       reset:string;
       
       @Column({type:"text"})           
       images:string;

       @Column({type:"double precision",default:null})
       ratings:number;

       @Column({type:"varchar",length:255,default:'admin'})
       role:string;

       @Column({type:"boolean",default:false})
       rush_hour:Boolean;

       @Column({type:"boolean",default:false})
       schedule:Boolean;

       @Column({type:"boolean",default:false})
       takeaway:boolean;

       @Column({type:"boolean",default:false})
       dinning:boolean;

       @Column({type:"boolean",default:true})
       delivery:boolean;
 
       @Column({type:"boolean",default:true})
       schedule_order:boolean

       @Column({type:"boolean",default:true})
       is_active:boolean;

       @Column({type:'varchar',length:300,nullable:true})
       fcmtoken:string

       @OneToMany(()=>DealerToAdminComplient,(complients)=>complients.dealer)
       complients:DealerToAdminComplient[];
      
       @OneToMany(() => DealerMenu,(product)=>product.dealer)
       product:DealerProducts[];

       @OneToMany(()=>OrderManagement,(order)=>order.dealer)
       order:OrderManagement[];

       @OneToMany(()=>PromoOffers,(coupon)=>coupon.dealer)
       coupon:PromoOffers[];

       @OneToMany(()=>Rating,(rating)=>rating.dealer)
       rating:Rating[];

       @OneToMany(()=>AdminNotification,(notification)=>notification.dealer)
       notification:AdminNotification[]; 

       @OneToMany(()=>DealerManagestaff,(managestaff)=>managestaff.dealer)
       managestaff:DealerManagestaff[];

       @OneToMany(()=>DealerNotifications,(dealernotifications)=>dealernotifications.dealer)
       dealernotifications:DealerNotifications[];

       @OneToMany(()=>ScheduleOrderManagement,(scheduleorder)=>scheduleorder.dealer)
       scheduleorder:ScheduleOrderManagement[];
       

       @OneToMany(()=>RestaurantSlotTiming,(slot)=>slot.dealer)
       slot:RestaurantSlotTiming[];

       @OneToMany(()=>ProductCustomization,(customization)=>customization.dealer)
       customization:ProductCustomization[];

       @OneToMany(()=>ProductTag,(foodtag)=>foodtag.dealer)
       foodtag:ProductTag[];


       @OneToMany(()=>ProductAddOn,(addons)=>addons.dealer)
       addons:ProductAddOn[];


       @OneToMany(()=>ProductsIngredient,(ingredient)=>ingredient.dealer)
       ingredient:ProductsIngredient[];

}
export default Dealer_Entity

