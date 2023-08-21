import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblPartner {
    @PrimaryGeneratedColumn()
    PartnerId: number;
    @Column()
    PartnerName: string;
    @Column()
    PartnerTypeID: number;
    @Column()
    IsActive: string;

}
