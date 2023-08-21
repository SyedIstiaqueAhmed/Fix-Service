import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SellService } from './Services/SellService';
import { ProductEntity } from './Entity/Product.Entity';
import { SellsEntity } from './Entity/selltable';
import { SellsDto } from './Dto/SellsDto';
import { ProductDto } from './Dto/Product.Dto';


@Controller('sells')
export class SelsController {
  constructor(private readonly adminService: SellService) {}

  @Get('/products')
  async findAllProducts(): Promise<ProductEntity[]> {
    return this.adminService.findAllProduct();
  }

  @Get('/sells')
  async findAllSells(): Promise<SellsEntity[]> {
    console.log("xdf")
    return this.adminService.findAllSelled();
  }

  @Post('/sell')
  async sellProduct(@Body() sell: SellsDto) {
    return this.adminService.sellproduct(sell);
  }

  @Post('/add-product')
  async addProduct(@Body() product: ProductDto) {
    return this.adminService.addproduct(product);
  }

  @Put('/update-product')
  async updateProduct(@Body() product: ProductEntity) {
    return this.adminService.updateproduct(product);
  }

  @Get('/profits-by-month/:month')
  async getProfitByMonth(@Param('month') month: Date) {
    return this.adminService.GetProfitByMonth(month);
  }

  @Get('/profits-by-year/:year')
  async getProfitByYear(@Param('year') year: Date) {
    return this.adminService.GetProfitByYear(year);
  }

  @Get('/sells-by-date/:date')
  async getSellsByDate(@Param('date') date: Date) {
    return this.adminService.getsellbydate(date);
  }

  @Get('/purchases-by-date/:date')
  async getPurchasesByDate(@Param('date') date: Date) {
    return this.adminService.getpurchasebydate(date);
  }

  @Get('/total-product')
  async totalProduct() {
    return this.adminService.CountTotalProduct();
  }
  @Get('/total-selled')
  async totalSelled() {
    return this.adminService.CountTotalSelled();

  }
  @Get('/total-Profit')
  async totalProfit1() {
    return this.adminService.totalProfit();
  }
  @Get('/total-Loss')
  async totalLoss1() {
    return this.adminService.totalLoss();
  }
  @Get('/total-products')
  async totalProducts() {
    return this.adminService.getTotalProducts();
  }
  @Get('/total-Customer')
  async totalCustomer() {
    return this.adminService.getTotalCustomers();
  }

 
    
}
