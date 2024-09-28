import { Column, CreateDateColumn, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import OrderManagement from "./order-management.entity";
import { Rating } from "./rating.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
      userid:number
    @Column({type:'varchar',length:255,nullable:true})
      fullName:string
    @Column({type:'varchar',length:255,nullable:true})
      address:string
    @Column({type:'varchar',length:255,nullable:true})
       city:string
    @Column({type:'bigint',nullable:true})
       pincode:number       
    @Column({type:'varchar',nullable:true})
      dob:string       
    @Column({type:'bigint',unique:true})
       mobileno:number   
    @Column({nullable:true})
       otp:number   
    @Column({type:'varchar',length:'255',unique:true,nullable:true})
       emailid:string
    @Column({type:'varchar',length:300,nullable:true}) 
       fcmtoken:string  
    @CreateDateColumn({type:'timestamp without time zone'})
       created_at:Date      
    @OneToMany(() => OrderManagement,order=>order.user)
       order:OrderManagement[]
    @OneToMany(()=>Rating,rating=>rating.user)
       rating:Rating[]   
   
}