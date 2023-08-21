import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblPurchaseDetails {
    @PrimaryGeneratedColumn()
    DetailsId : number;
    @Column()
    PurchaseId : number;
    @Column()
    ItemId : number;
    @Column()
    ItemQuantity : number;
    @Column()
    UnitPrice : number;
    @Column()
    IsActive: string;

}