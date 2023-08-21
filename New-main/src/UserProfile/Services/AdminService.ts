import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AddUserDto, UpdateUserDto } from '../Dto/AddUserDto';
import { User } from '../Entity/Admin';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}
    
    async findAll(): Promise<User[]> {
        var data=await this.repo.find();
        return data;
    }
    async findOne(UserId: number): Promise<User> {
        return await this.repo.findOneBy({UserId});
    }
    
    async findemail(UserEmail: string): Promise<User> {
        return await this.repo.findOneBy({UserEmail});
    }
    async findpassword(UserPassword: string): Promise<User> {
        return await this.repo.findOneBy({UserPassword});
    }

   

    async create(user: AddUserDto) {
        console.log("Service"+user.UserPassword);
        return await this.repo.save(user);
    }
    
    async update(id: number, user: UpdateUserDto): Promise<void> {
        await this.repo.update(id, user);
    }
    
    async delete(id: number): Promise<void> {
        console.log("delete Service"+id);
        await this.repo.delete(id);
    }
    async signin(email: string, password: string) {
        
        
        const user = await this.findemail(email);
        if (!user) {
            console.log("User not found");
            throw new NotFoundException('User not found');
        }
        // const passwordMatch = await bcrypt.compare(password, user.UserPassword);
        // if (user.UserPassword !== password) {
            
        //     console.log("Invalid password");
        //     throw new BadRequestException('Invalid password');
        // }
        if(user.Role=="admin"){
            
            
            console.log("admin");
            return user;
        }else if(user.Role=="mechanic"){
           

            console.log("mechanic");
            return user;}
            else if(user.Role=="user"){
           

                console.log("mosjid");
                return user;}

        ;

    }
    }
