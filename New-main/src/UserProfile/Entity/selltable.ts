import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class SellsEntity {
  @PrimaryGeneratedColumn("identity")
    ProductId: number;
    @Column()
    SellId:number
    @Column()
    ProductName:string
    @Column()
    ProductDescription:string
    @Column()
    ProductPrice:number
    @Column({ length: 10000 }) 
    ProductImage:string
    @Column()
    ProductCategory:string
    @Column()
    ProductQuantity:number
    @Column({ nullable: true })
    Buyingrice:number
    @Column({ nullable: true })
    BuyingDate:Date
    @Column({ nullable: true })
    Sellingrice:number
    @Column({ nullable: true })
    SellingDate:Date
    

    
    


  
}
