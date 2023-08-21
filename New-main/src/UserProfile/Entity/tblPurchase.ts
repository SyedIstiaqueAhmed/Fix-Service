import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblPurchase {
    @PrimaryGeneratedColumn()
    PurchaseId : number;
    @Column()
    SupplierId: number;
    @Column()
    PurchaseDate : Date;
    @Column()
    IsActive: string;

}