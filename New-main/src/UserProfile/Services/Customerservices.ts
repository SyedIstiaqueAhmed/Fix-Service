import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Generated, Repository } from 'typeorm';
import { AddUserDto, UpdateUserDto } from '../Dto/AddUserDto';
import { User } from '../Entity/Admin';
import { tblItem } from '../Entity/tblItem';
import { tblPartner } from '../Entity/tblPartner';
import { tblPartnerType } from '../Entity/tblPartnerType';
import { tblPurchase } from '../Entity/tblPurchase';
import { tblPurchaseDetails } from '../Entity/tblPurchaseDetails';
import { tblSales } from '../Entity/tblSales';
import { tblSalesDetails } from '../Entity/tblSalesDetails';
import { PartnerTypeDto } from '../Dto/PartnerType';
import { PartnerDto } from '../Dto/ParnterDto';
import { ItemDto } from '../Dto/ItemDto';
import { PurchaseDto } from '../Dto/PurchaseDto';
import { SalesDto } from '../Dto/SalesDto';
import { DailyShowDto } from '../Dto/DailyShowDto';
import { ReportDto } from '../Dto/ReportDto';
import { ReportTable } from '../Dto/ReportTable';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(tblItem)
        private readonly Item: Repository<tblItem>,
        @InjectRepository(tblPartner)
        private readonly Partner: Repository<tblPartner>,
        @InjectRepository(tblPartnerType)
        private readonly PartnerType: Repository<tblPartnerType>,
        @InjectRepository(tblPurchase)
        private readonly Purchase: Repository<tblPurchase>,
        @InjectRepository(tblPurchaseDetails)
        private readonly PurchaseDetails: Repository<tblPurchaseDetails>,
        @InjectRepository(tblSales)
        private readonly Sales: Repository<tblSales>,
        @InjectRepository(tblSalesDetails)
        private readonly SalesDetails: Repository<tblSalesDetails>,
    ) {}

    //async AddPartnerType

    async AddPartnerType(PartnerType: PartnerTypeDto): Promise<tblPartnerType> {
        const newPartnerType = await this.PartnerType.save(PartnerType);
        return newPartnerType;
    }
    async AddPartner(PartnerType: PartnerDto): Promise<tblPartner> {
        const newPartner = await this.Partner.save(PartnerType);
        return newPartner;
        
    }
    async AddItem(Item: ItemDto): Promise<tblItem> {
        const newItem = await this.Item.save(Item);
        return newItem;
    }
    async UpdateItem(Item: ItemDto): Promise<tblItem> {
        const newItem = await this.Item.save(Item);
        return newItem;
    }
    async AddPurchase(Purchase: PurchaseDto) {
        var dt={
          
            SupplierId: Purchase.SupplierId,
           
            PurchaseDate: Purchase.PurchaseDate,
            
            IsActive: Purchase.IsActive,
          }
        const newPurchase = await this.Purchase.save(dt);
        const generatedSalesId = Purchase.PurchaseId;
        var Pdetails={
            PurchaseId: generatedSalesId,   
            ItemId: Purchase.ItemId,
            ItemQuantity: Purchase.ItemQuantity,
            UnitPrice: Purchase.UnitPrice,
            IsActive: Purchase.IsActive,
  
        }
        const newPurchaseDetails = await this.PurchaseDetails.save(Pdetails);



       
        return newPurchase;
    }
    async SellItem(Sell: SalesDto) {
        var dt={
          
            CustomerId: Sell.CustomerId,
           
            SalesDate: Sell.SalesDate,
            
            IsActive: Sell.IsActive,
          }
        const newSell = await this.Sales.save(dt);
        const generatedSalesId = Sell.SalesId;
        
        var Pdetails={
            SalesId: generatedSalesId,
            ItemId: Sell.ItemId,
            ItemQuantity: Sell.ItemQuantity,
            UnitPrice: Sell.UnitPrice,
            IsActive: Sell.IsActive,
  
        }
        const newSellDetails = await this.SalesDetails.save(Pdetails);
        return Sell;
    }
    async DailyPurchaseReport( targetDate: Date) {
        const result = await this.Item
      .createQueryBuilder('item')
      .innerJoin(
        'item.purchaseDetails',
        'purchaseDetails',
        'item.ItemId = purchaseDetails.ItemId',
      )
      .innerJoin(
        'purchaseDetails.purchase',
        'purchase',
        'purchaseDetails.PurchaseId = purchase.PurchaseId',
      )
      .where('purchase.PurchaseDate = :targetDate', { targetDate })
      .select([
        'item.ItemId',
        'item.ItemName',
        'purchaseDetails.ItemQuantity',
      ])
      .getRawMany();
      return result;
    }
    async getMonthlyPurchase(targetDate: Date): Promise<DailyShowDto[]> {
        const targetMonth = targetDate.getMonth() + 1; // Months are 0-indexed in JavaScript.
    
        const result = await this.Item
          .createQueryBuilder('item')
          .innerJoin(
            'item.salesDetails',
            'sellsDetails',
            'item.ItemId = sellsDetails.ItemId',
          )
          .innerJoin('sellsDetails.sales', 'sales', 'sellsDetails.SalesId = sales.SalesId')
          .where('MONTH(sales.SalesDate) = :targetMonth', { targetMonth })
          .select(['item.ItemId', 'item.ItemName', 'sellsDetails.ItemQuantity'])
          .getRawMany();
    
        return result;
      }
      async generateReport(targetDate: Date): Promise<ReportDto[]> {
        const result = await this.Item
          .createQueryBuilder('item')
          .innerJoin(
            'item.purchaseDetails',
            'purchaseDetails',
            'item.ItemId = purchaseDetails.ItemId',
          )
          .innerJoin(
            'purchaseDetails.purchase',
            'purchase',
            'purchaseDetails.PurchaseId = purchase.PurchaseId',
          )
          .where('purchase.PurchaseDate = :targetDate', { targetDate })
          .select([
            'item.ItemId',
            'item.ItemName',
            'purchaseDetails.ItemQuantity',
            'purchaseDetails.UnitPrice',
            '0 AS SurchaseQuantity', // Adding 0 for fields specific to sales data
            '0 AS SUnitPrice',
          ])
          .getRawMany();
    
        const result2 = await this.Item
          .createQueryBuilder('item')
          .innerJoin(
            'item.salesDetails',
            'sellsDetails',
            'item.ItemId = sellsDetails.ItemId',
          )
          .innerJoin(
            'sellsDetails.sales',
            'sales',
            'sellsDetails.SalesId = sales.SalesId',
          )
          .where('sales.SalesDate = :targetDate', { targetDate })
          .select([
            'item.ItemId',
            'item.ItemName',
            '0 AS PurchaseQuantity', // Adding 0 for fields specific to purchase data
            '0 AS PUnitPrice',
            'sellsDetails.ItemQuantity AS SurchaseQuantity',
            'sellsDetails.UnitPrice AS SUnitPrice',
          ])
          .getRawMany();
    
        const combinedResult = [...result, ...result2];
        return combinedResult;
      }
      async generateRevenueReport(targetDate: Date): Promise<ReportTable[]> {
        const month = targetDate.getMonth() + 1; // Months are 0-indexed in JavaScript.
        const year = targetDate.getFullYear();
    
        const resPurchase = await this.Item
          .createQueryBuilder('item')
          .innerJoin(
            'item.purchaseDetails',
            'purchaseDetails',
            'item.ItemId = purchaseDetails.ItemId',
          )
          .innerJoin(
            'purchaseDetails.purchase',
            'purchase',
            'purchaseDetails.PurchaseId = purchase.PurchaseId',
          )
          .where('MONTH(purchase.PurchaseDate) = :month', { month })
          .andWhere('YEAR(purchase.PurchaseDate) = :year', { year })
          .andWhere('item.IsActive = :isActive', { isActive: 'Active' })
          .andWhere('purchaseDetails.IsActive = :isActive', { isActive: 'Active' })
          .andWhere('purchase.IsActive = :isActive', { isActive: 'Active' })
          .groupBy('item.ItemId, item.ItemName')
          .select([
            'item.ItemId',
            'item.ItemName',
            'SUM(purchaseDetails.ItemQuantity * purchaseDetails.UnitPrice) AS PurchaseTotal',
          ])
          .getRawMany();
    
        const selled = await this.Item
          .createQueryBuilder('item')
          .innerJoin(
            'item.salesDetails',
            'sellsDetails',
            'item.ItemId = sellsDetails.ItemId',
          )
          .innerJoin(
            'sellsDetails.sales',
            'sales',
            'sellsDetails.SalesId = sales.SalesId',
          )
          .where('MONTH(sales.SalesDate) = :month', { month })
          .andWhere('YEAR(sales.SalesDate) = :year', { year })
          .andWhere('item.IsActive = :isActive', { isActive: 'Active' })
          .andWhere('sellsDetails.IsActive = :isActive', { isActive: 'Active' })
          .andWhere('sales.IsActive = :isActive', { isActive: 'Active' })
          .groupBy('item.ItemId, item.ItemName')
          .select([
            'item.ItemId',
            'item.ItemName',
            'SUM(sellsDetails.ItemQuantity * sellsDetails.UnitPrice) AS SellTotal',
          ])
          .getRawMany();
    
        const data1 = await this.Item
          .createQueryBuilder('item')
          .leftJoinAndSelect('item.salesDetails', 'sellsDetails')
          .leftJoinAndSelect('item.purchaseDetails', 'purchaseDetails')
          .where('item.IsActive = :isActive', { isActive: 'Active' })
          .andWhere('item.ItemId IN (:...itemIds)', {
            itemIds: [...resPurchase.map((item) => item.ItemId), ...selled.map((item) => item.ItemId)],
          })
          .getMany();
    
        const combinedResult: ReportTable[] = data1.map((item) => {
          const purchaseItem = resPurchase.find((pItem) => pItem.ItemId === item.ItemId);
          const sellItem = selled.find((sItem) => sItem.ItemId === item.ItemId);
    
          const reportTable: ReportTable = {
            ItemId: item.ItemId,
            ItemName: item.ItemName,
            Year: year.toString(),
            MonthName: month.toString(),
            PurchaseTotal: purchaseItem?.PurchaseTotal ?? 0,
            SellTotal: sellItem?.SellTotal ?? 0,
            plStatus: (purchaseItem !== undefined && sellItem !== undefined)
              ? (purchaseItem.PurchaseTotal - sellItem.SellTotal) >= 0
                ? 'Profit'
                : 'Loss'
              : (purchaseItem !== undefined ? 'No sell' : (sellItem !== undefined ? 'No purchase' : 'No transaction Occur')),
          };
    
          return reportTable;
        });
    
        return combinedResult;
      }










}