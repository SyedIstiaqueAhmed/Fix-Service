import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductEntity } from '../Entity/Product.Entity';
import { ProductDto } from '../Dto/Product.Dto';
import { SlideShowEntity } from '../Entity/Slideshow';
import { SlideShowDto } from '../Dto/SlideShowDto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
        @InjectRepository(SlideShowEntity)
        private readonly slideShow: Repository<SlideShowEntity>,
    ) {}
    
    async findAll(): Promise<ProductEntity[]> {
        var data=await this.repo.find();
        return data;
    }
    
    async create(user: ProductDto): Promise<ProductEntity> {
        return await this.repo.save(user);
    }
    
    async update(id: number, user: ProductDto): Promise<void> {
        await this.repo.update(id, user);
    }
    
    async delete(id: number): Promise<void> {
        console.log("delete Service"+id);
        await this.repo.delete(id);
    }
    async findSlideShow(): Promise<SlideShowEntity[]> {
        var data=await this.slideShow.find();
        return data;
    }
    async createSlideShow(user: SlideShowDto){
        return await this.slideShow.save(user);
    }
    
   
}

