import { agent } from "supertest";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import OrderManagement from "./order-management.entity";

@Entity()
export class Agent {

@PrimaryGeneratedColumn()
id:number;

@Column({type:"varchar",length:255})
name:string;

@Column({type:"varchar",length:255})
address:string;

@Column({type:"bigint"})
mobile:number;

@Column({type:'varchar',length:300,nullable:true})
fcmtoken:string

@OneToMany(()=>OrderManagement,(order)=>order.agent)
order:OrderManagement[];



@CreateDateColumn({type:"timestamp"})
created_at:Date;

@Column({type:"boolean",default:true})
is_active:boolean;


}
