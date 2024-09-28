import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminNotification } from "./admin_notification.entity";
import { DealerToAdminComplient } from "src/entities/dealer_to-admin-complient.entity";

@Entity()
export class AdminInfo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",length:255,unique:true})
    username:string;

    @Column({type:"bigint"})
    mobile:number;

    @Column({type:"varchar"})
    email:string;

    @OneToMany(()=>AdminNotification,(notification)=>notification.admin)
    notification:AdminNotification[];

    @OneToMany(()=>DealerToAdminComplient,(complients)=>complients.admin)
    complients:DealerToAdminComplient[];

}
