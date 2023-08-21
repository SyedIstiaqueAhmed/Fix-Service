import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblItem {
    @PrimaryGeneratedColumn()
    ItemId: number;
    @Column()
    ItemName: string;
    @Column()
   StockQuantity: number;
   @Column()
   IsActive:string;




}