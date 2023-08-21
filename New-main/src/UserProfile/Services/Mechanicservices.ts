import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductEntity } from '../Entity/Product.Entity';
import { tblMechanic } from '../Entity/Mechanic';
import { MechanicDTO } from '../Dto/MechanicDto';

@Injectable()
export class MechanicService {

    constructor(
        @InjectRepository(tblMechanic)
        private readonly repo: Repository<tblMechanic>,
    ) {}
    
    async findAll(): Promise<tblMechanic[]> {
        var data=await this.repo.find();
        return data;
    }
    
    async create(user: MechanicDTO): Promise<tblMechanic> {
        return await this.repo.save(user);
    }
    
    async update(id: number, user: MechanicDTO): Promise<void> {
        await this.repo.update(id, user);
    }
    
    async delete(id: number): Promise<void> {
        console.log("delete Service"+id);
        await this.repo.delete(id);
    }
    async find(MechanicId: number): Promise<tblMechanic> {
        return await this.repo.findOneBy({ MechanicId});
    }
    async findName(MechanicId: number,Name:MechanicDTO) {
        var data= await this.repo.findOneBy({ MechanicId});
        if(data!= null){
            return data;
            
        }
       

       
        return await this.repo.findOneBy({ MechanicName:Name.MechanicName});
    }
    async findByCity(city: MechanicDTO): Promise<tblMechanic[]> {
      var data = await this.repo.find({ where: { City: city.City } });
      console.log(data);
      return data;
      }

   
}

