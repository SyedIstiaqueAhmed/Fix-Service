import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class ProfitEntity {
  @PrimaryGeneratedColumn()
    ProductId: number;
    @Column()
    ProductName:string
   
    @Column()

    Buydate:Date
    @Column()
    sellDate:Date
       
    @Column()
    Profit:number
    @Column()
    ProfitorLoss:string
  
    

    
    


  
}
