import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { PartnerTypeDto } from './Dto/PartnerType';
import { PartnerDto } from './Dto/ParnterDto';
import { ItemDto } from './Dto/ItemDto';
import { PurchaseDto } from './Dto/PurchaseDto';
import { SalesDto } from './Dto/SalesDto';
import { DailyShowDto } from './Dto/DailyShowDto';
import { ReportDto } from './Dto/ReportDto';
import { ReportTable } from './Dto/ReportTable';
import { CustomerService } from './Services/Customerservices';
import { tblPartnerType } from './Entity/tblPartnerType';
import { tblPartner } from './Entity/tblPartner';
import { tblItem } from './Entity/tblItem';

@Controller('Ecommerce')
export class EController {
  constructor(private readonly adminService: CustomerService) {}
  @Post('/add-partner-type')
  async addPartnerType(@Body() partnerType: PartnerTypeDto): Promise<tblPartnerType> {
    return this.adminService.AddPartnerType(partnerType);
  }

  @Post('/add-partner')
  async addPartner(@Body() partner: PartnerDto): Promise<tblPartner> {
    return this.adminService.AddPartner(partner);
  }

  @Post('/add-item')
  async addItem(@Body() item: ItemDto): Promise<tblItem> {
    return this.adminService.AddItem(item);
  }

  @Post('/update-item')
  async updateItem(@Body() item: ItemDto): Promise<tblItem> {
    return this.adminService.UpdateItem(item);
  }

  @Post('/add-purchase')
  async addPurchase(@Body() purchase: PurchaseDto) {
    return this.adminService.AddPurchase(purchase);
  }

  @Post('/sell-item')
  async sellItem(@Body() sell: SalesDto) {
    return this.adminService.SellItem(sell);
  }

  @Get('/daily-purchase-report/:targetDate')
  async dailyPurchaseReport(@Param('targetDate') targetDate: string) {
    const date = new Date(targetDate);
    return this.adminService.DailyPurchaseReport(date);
  }

  @Get('/monthly-purchase/:targetDate')
  async getMonthlyPurchase(@Param('targetDate') targetDate: string): Promise<DailyShowDto[]> {
    const date = new Date(targetDate);
    return this.adminService.getMonthlyPurchase(date);
  }

  @Get('/generate-report/:targetDate')
  async generateReport(@Param('targetDate') targetDate: string): Promise<ReportDto[]> {
    const date = new Date(targetDate);
    return this.adminService.generateReport(date);
  }

  @Get('/generate-revenue-report/:targetDate')
  async generateRevenueReport(@Param('targetDate') targetDate: string): Promise<ReportTable[]> {
    const date = new Date(targetDate);
    return this.adminService.generateRevenueReport(date);
  }
  // Implement the endpoints for the service methods here
}
