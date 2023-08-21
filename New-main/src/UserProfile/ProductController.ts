import {  Body,  Controller,  Delete,  FileTypeValidator,  Get,  MaxFileSizeValidator,  Param,  ParseFilePipe,  ParseIntPipe,  Patch,  Post,  Put,  Query,  Res,  Session,  UnauthorizedException,  UploadedFile,  UseGuards,  UseInterceptors,  UsePipes,  ValidationPipe,} from '@nestjs/common';
import { AdminService } from './Services/AdminService';
;
import { ProductService } from './Services/Product.Services';
import { ProductEntity } from './Entity/Product.Entity';
import { ProductDto } from './Dto/Product.Dto';
import { SlideShowDto } from './Dto/SlideShowDto';


@Controller('Product')
export class  ProductController {

   
    constructor(private readonly AdminService: ProductService) {}
    
    @Get('')
    async findAll(): Promise< ProductEntity[]> {
        return await this.AdminService.findAll();
    }
    
    @Post('/create')
    async create(@Body()  Product:  ProductDto): Promise< ProductEntity> {
        return await this.AdminService.create( Product);
    }
   
 
    @Put('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body()  ProductEntity:  ProductDto){
        await this.AdminService.update(id,  ProductEntity);
    }
    
    @Delete('/delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        console.log("delete"+id);
        await this.AdminService.delete(id);
    } 
    

    @Get('/get/Slideshow')
    async getSlideshow() {

        return await this.AdminService.findSlideShow();
    }
    @Post('/create/Slideshow')
    async createSlideshow(@Body()  slideShowDto:SlideShowDto) {
        
        return await this.AdminService.createSlideShow( slideShowDto);
    }


}