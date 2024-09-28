import { timeStamp } from "console";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";
import { Role } from "src/enum/role.enum";

@Entity()
export class DealerManagestaff {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",length:255})
    name:string;

    @Column({type:"bigint"})
    mobile:number;

    @Column({type:"varchar",length:255,default:Role.EMPLOYEE})
    role:string;

    @CreateDateColumn({type:"timestamp"})
    created_at:Date;

    @Column({type:"boolean",default:true})
    is_active:boolean;

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.managestaff)
    dealer:Dealer_Entity;
}
