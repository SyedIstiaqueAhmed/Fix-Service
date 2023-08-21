import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class tblMechanic{
    @PrimaryGeneratedColumn("identity")
    MechanicId: number;
    @Column()
    MechanicName: string;
    @Column()
    MechanicTypeName: string;
    @Column()
    City: string;
    @Column()
    ActiveHours: string;    
    @Column()
    IsActive: string;
    @Column()
    MobileNumber: string;
    @Column()
    latitude: string;
    @Column()
    longitude: string;

}
