import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Dealer_Entity from "./dealer_detail.entity";
import { AdminInfo } from "src/entities/admin_info.entity";

@Entity()
export class DealerToAdminComplient {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    message:string;

    @CreateDateColumn()
    created_at:Date;

    @ManyToOne(()=>Dealer_Entity,(dealer)=>dealer.complients)
    dealer:Dealer_Entity;

    @ManyToOne(()=>Dealer_Entity,(admin)=>admin.complients)
    admin:AdminInfo;

    

}
