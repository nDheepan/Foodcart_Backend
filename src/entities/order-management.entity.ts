import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";
import { OrderItem } from "./order-item.entity";
import { Rating } from "src/entities/rating.entity";
import { User } from "./customer_detail.entity";
import { Agent } from "./agent.entity";
import Payment from "./payment.entity";

@Entity()
class OrderManagement {

@PrimaryGeneratedColumn()
id:number;

@Column({type:"varchar",length:255,default:null})
deliverystatus:string;

@Column({type:"double precision",default:null})
total:number;

@CreateDateColumn({type:"timestamp"})
created_at:Date;

@CreateDateColumn({type:"timestamp"})
cancelled_at:Date;

@Column({type:"boolean",default:false})
preorder : boolean;

@Column({type:"varchar",length:255,default:null})
schedule_date:string;

@Column({type:"varchar",length:255,default:null})
schedule_time:string;

@CreateDateColumn({type:"timestamp"})
modified_at:Date;

@Column()
order_instruction:string;

@Column({nullable:true})
deliver_to:string;

@Column({type:"varchar",length:255,default:null})
cancelledBy:string;

@Column({type:"boolean",default:false})
cancellation:boolean;

@ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.order)
dealer:Dealer_Entity; 

@ManyToOne(()=>User,(user)=>user.order)
@JoinColumn({name:'userid'})
user:User;

@Column({type:"integer",default:null})
preparation_time:number;

@ManyToOne(()=>Agent,(agent)=>agent.order)
agent:Agent;

@OneToMany(()=>OrderItem,(item)=>item.order)
item:OrderItem[];

@OneToMany(()=>Rating,(rating)=>rating.order)
rating:Rating[];

@OneToOne(() =>Payment, payment=>payment.order)
payment:Payment
}
export default OrderManagement