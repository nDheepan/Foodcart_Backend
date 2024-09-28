import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DealerMenu from "./dealer_product.entity";
import { ApiProperty } from "@nestjsx/crud/lib/crud";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    
    @Column()
    type: string;

    
    @ApiProperty({type: () => [String]})
    @Column({ type: 'varchar', array: true })
    category: string[];

    @Column()
    preference: string;

    @ApiProperty({type: () => [String]})
    @Column({ type: 'varchar', array: true })
    meal_type: string[];

    @ApiProperty({type: () => [String]})
    @Column({ type: 'varchar', array: true })
    cuisine: string[];
    
    @ManyToOne(()=>DealerMenu,(dealermenu)=>dealermenu.category,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    dealermenu:DealerMenu;





}
