import { Controller, Get,Post,Body,Param} from '@nestjs/common';
import { CartService } from './Services/cartservice';
import { CartDto } from './Dto/cartdto';



@Controller('cart')
export class CartController {
  constructor(private readonly appService: CartService) {}

    @Post('/add')
    async addtocart(@Body() product:CartDto){
      console.log(product);
        return this.appService.addtocart(product);
    }
    // @Get()
    // async getcart(){
    //     return this.appService.getcart();
    // }
    @Get('/deletecart')
    async deletecart(){
        return this.appService.deletecart();
    }
    @Get('/getcart')
  async getAllCartItems(): Promise<Record<string, CartDto>> {
    return this.appService.getAllCartItems();
  }
    

}