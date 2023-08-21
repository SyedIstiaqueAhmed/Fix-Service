import { Module } from '@nestjs/common';
import{TypeOrmModule} from '@nestjs/typeorm';
import {  NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { User } from '../Entity/Admin';
import { AdminService } from '../Services/AdminService';
import { AdminController } from '../AdminController';
import { ProductEntity } from '../Entity/Product.Entity';
import { ProductService } from '../Services/Product.Services';
import { ProductController } from '../ProductController';
import { AuthGuard } from '../Authgourd/AuthGurd';
import { CartController } from '../CartController';
import { CartService } from '../Services/cartservice';
import { tblItem } from '../Entity/tblItem';
import { tblPartner } from '../Entity/tblPartner';
import { tblPartnerType } from '../Entity/tblPartnerType';
import { tblPurchase } from '../Entity/tblPurchase';
import { tblPurchaseDetails } from '../Entity/tblPurchaseDetails';
import { tblSales } from '../Entity/tblSales';
import { tblSalesDetails } from '../Entity/tblSalesDetails';
import { CustomerService } from '../Services/Customerservices';
import { EController } from '../Econtroller';
import { tblMechanic } from '../Entity/Mechanic';
import { MechanicService } from '../Services/Mechanicservices';
import { MechanicController } from '../MechanicController';
import { SellsEntity } from '../Entity/selltable';
import { ProfitEntity } from '../Entity/ProfitTable';
import { SelsController } from '../sellsController';
import { SellService } from '../Services/SellService';
import { SlideShowEntity } from '../Entity/Slideshow';
@Module({
	imports:[
	TypeOrmModule.forRoot({
      type: 'mysql',
      //urlfor online
      //url: process.env.DATABASE_URL,
        host: 'localhost',
        port: 3456,
        username: 'root',
        password: '20101273',
        database: 'ecommerce',
       // entities: [User,ProductEntity,tblItem,,tblPartner,tblPartnerType,tblPurchase,tblPurchaseDetails,tblSales,tblSalesDetails],
        autoLoadEntities: true,
        synchronize: false,
	}),TypeOrmModule.forFeature([User,ProductEntity,tblItem,tblPartner,tblPartnerType,tblPurchase,tblPurchaseDetails,
    tblSales,tblSalesDetails,tblMechanic,SellsEntity,ProfitEntity,SlideShowEntity])
	],
  providers: [AdminService,ProductService,AuthGuard,CartService,CustomerService,MechanicService,SellService],
  controllers: [AdminController,ProductController,CartController,EController,MechanicController,SelsController],
})
export class DatabaseModulemosque {}


