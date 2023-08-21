import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  UserName: string;

  @Column()
  UserEmail: string;

  @Column()
  UserPassword: string;

  @Column()
  Contact: string;

  @Column()
  Role: string;

  @Column()
  Status: string;
  @Column()
    Description:string
    @Column()
    MobileNumber:Number
    @Column()
   Address:string

  
}
