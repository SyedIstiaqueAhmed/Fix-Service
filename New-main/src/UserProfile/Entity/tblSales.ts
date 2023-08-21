import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblSales {
    @PrimaryGeneratedColumn()
    SalesId : number;
    @Column()
    CustomerId: number;
    @Column()
    SalesDate: string;
    @Column()
    IsActive: string;

}