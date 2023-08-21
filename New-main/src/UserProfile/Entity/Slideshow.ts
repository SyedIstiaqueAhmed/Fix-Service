import { Max, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class SlideShowEntity {
  @PrimaryGeneratedColumn('identity')
    ProductId: number;
    @Column({ length: 5000 }) 
   ImageAddress:string
   
}
