import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblPartnerType {
    @PrimaryGeneratedColumn()
    PartnerTypeId: number;
    @Column()
    PartnerTypeName: string;
    @Column()
    IsActive: string;

}