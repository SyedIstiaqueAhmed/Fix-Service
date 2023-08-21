import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblSalesDetails {
    @PrimaryGeneratedColumn()
    DetailsId : number;
    @Column()
    SalesId : number;
    @Column()
    ItemId : number;
    @Column()
    ItemQuantity : number;
    @Column()
    UnitPrice : number;
    @Column()
    IsActive: string;

}