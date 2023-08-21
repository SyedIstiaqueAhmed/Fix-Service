import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';



@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('identity')
    ProductId: number;
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
    @Column()
    ProductStatus:string
    @Column()
    ProductRating:number
    @Column()
    ProductReview:string
    @Column({ nullable: true })
    Buyingrice:number
    @Column({ nullable: true })
    BuyingDate:Date
    @Column({ nullable: true })
    Stocks:number 
}
