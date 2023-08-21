import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto, UpdateUserDto } from '../Dto/AddUserDto';
import { User } from '../Entity/Admin';
import { ProductEntity } from '../Entity/Product.Entity';
import { SellsEntity } from '../Entity/selltable';
import { ProfitEntity } from '../Entity/ProfitTable';
import { SellsDto } from '../Dto/SellsDto';
import { ProductDto } from '../Dto/Product.Dto';
import { ProfitDto } from '../Dto/ProfitDto';
import { randomInt } from 'crypto';
import { min } from 'class-validator/types/decorator/number/Min';
import { max } from 'class-validator/types/decorator/number/Max';

@Injectable()
export class SellService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly product: Repository<ProductEntity>,
        @InjectRepository(SellsEntity)
        private readonly sell: Repository<SellsEntity>,
        @InjectRepository(ProfitEntity)
        private readonly profit: Repository<ProfitEntity>,
    ) {
    }
    async findAllProduct(): Promise<ProductEntity[]> {
        var data = await this.product.find();
        return data;
    }
    async findAllSelled(): Promise<SellsEntity[]> {
        var data = await this.sell.find();
        return data;
    }
    async findAllProfits() {
        var data = await this.profit.find();
    
        return data;
    }
    async CountTotalProduct(): Promise<number> {
        var data = await this.product.count();
        return data;
    }
    async CountTotalSelled(): Promise<number> {
        var data = await this.sell.count();
        return data;
    }
    async totalProfit(): Promise<number> {
        var data = await this.profit.find();
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            total = total + data[i].Profit;
        }
        return total;
    }
    async totalLoss(): Promise<number> {
        var data = await this.profit.find();
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].ProfitorLoss == "Loss") {
                total = total + data[i].Profit;
            }
        }
        return total;
    }

    async sellproduct(sell:SellsDto) {
      try{ 
         console.log(sell);

        var product = await this.product.findOne({ where: { ProductId: sell.ProductId } });
        console.log("debugger");
        if(sell.ProductName!=product.ProductName){
            throw new NotFoundException("Product not found");
        }
        console.log(product.ProductName);
        // if (product==null) {
        //     console.log("debugger");
        //     throw new NotFoundException("Product not found");
            
        // }
        if (product.ProductQuantity < sell.ProductQuantity) {
            throw new BadRequestException("Product Quantity not available");
        }
        var sellproduct = new SellsDto();
      
        sellproduct.SellId= product.ProductId;
        sellproduct.ProductName = product.ProductName;
        sellproduct.ProductDescription = product.ProductDescription;
        sellproduct.ProductPrice = product.ProductPrice;
        sellproduct.ProductImage = product.ProductImage;
        sellproduct.ProductCategory = product.ProductCategory;
        sellproduct.ProductQuantity = product.ProductQuantity;
        sellproduct.Buyingrice = product.ProductPrice;
        sellproduct.BuyingDate = product.BuyingDate;
        sellproduct.Sellingrice = sell.ProductPrice;
        sellproduct.SellingDate = new Date();
        console.log("debugger");
        await this.sell.save(sellproduct);

        product.ProductQuantity = product.ProductQuantity - sell.ProductQuantity;
        if(product.ProductQuantity==0)
        {
            product.ProductStatus="Out of Stock";
        }
        await this.product.save(product);
      
        var profit1 = await this.profit.findOne({ where: { ProductId: sell.ProductId } });
        console.log(profit1);
        if(profit1!=null){
            console.log("debuggerprofit");
            var lop =sell.ProductPrice - product.ProductPrice
            console.log(sell.ProductPrice,product.ProductPrice,lop);
            if(lop<0){
                profit1.Profit=profit1.Profit- lop;
                if(profit1.Profit<0){
                    profit1.ProfitorLoss="Loss";
                    profit1.Profit=400;
                 var profit2 = await this.profit.findOne({ where: { Profit: profit1.Profit } });
                    if(profit2.Profit< 400){
                        profit2.Profit= 400+90;

                    }else if(profit2.Profit< 490){
                        profit2.Profit= 490+90;
                    }else if(profit2.Profit< 580){
                        profit2.Profit= 580+90;}

                }

            }

            profit1.Profit=profit1.Profit+ lop;
            if(profit1.Profit>0){
                profit1.ProfitorLoss="Profit";
                profit1.Profit=5500;
                var profit2 = await this.profit.findOne({ where: { Profit: profit1.Profit } });
                    if(profit2.Profit< 500){
                        profit2.Profit= 500+950;

                    }else if(profit2.Profit< 490){
                        profit2.Profit= 490+950;
                    }else if(profit2.Profit< 580){
                        profit2.Profit= 580+950;}

            }

        }else{
        var profit = new ProfitDto();
        profit.ProductId = product.ProductId;
        profit.ProductName = product.ProductName;
        profit.Buydate = product.BuyingDate;
        profit.sellDate = new Date();
        var Profit = sell.ProductPrice - product.ProductPrice;
        
        profit.Profit = Profit;
        if(Profit<0)
        {
            profit.ProfitorLoss="Loss"
        }
        else{
            profit.ProfitorLoss="Profit"
        }}

        await this.profit.save(profit);}
        catch(e){console.log(e);
            
            return e;
            
        }
      
}

async addproduct(product:ProductDto) {
    
    await this.product.save(product);}
    async updateproduct(product:ProductEntity) {
        var product = await this.product.findOne({ where: { ProductId: product.ProductId } });
        if (product==null) {
            throw new NotFoundException("Product not found");
        }
        await this.product.save(product);
    }
    async GetProfitByMonth(month:Date) {
        var data = await this.profit.find({ where: { sellDate: month } });
        return data;
    }
    async GetProfitByYear(year:Date) {
        var data = await this.profit.find({ where: { sellDate: year } });
        return data;
    }
    async getsellbydate(date:Date) {
        var data = await this.sell.find({ where: { SellingDate: date } });
        return data;
    }
    async getpurchasebydate(date:Date) {
        var data = await this.product.find({ where: { BuyingDate: date } });
        return data;
    }
    async getTotalProducts(){
        var data = await this.product.find();
        const count = data.length;
        return count;
    }
    async getTotalCustomers(){
        var data = await this.profit.find();
        const count = data.length;
        return count;
    }

}
