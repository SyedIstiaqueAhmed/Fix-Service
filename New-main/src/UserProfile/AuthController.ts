import{Controller,Post,Request,UseGuards,Get,Body,Param,Delete,Put,ParseIntPipe,    Session} from '@nestjs/common';
import { LoginUserDto } from './Dto/AddUserDto';
import { AuthService } from './Services/Login.service';
import { AdminService } from './Services/AdminService';


@Controller('auth')
export class AuthController {
constructor(private auth: AuthService){}
   // @UseGuards(Au)
   
   @Post('/signin')
   async signin(@Body() body: LoginUserDto, @Session() session: any) {
     const user = await this.auth.signin(body. UserEmail, body. UserPassword);
     session.userId = user.UserId;
     return user;
   }
   @Post('/signout')
  logout(@Session() session: any) {
    session.userId = null;
  }
  @Get('/profile')
  profile(@Session() session: any) {
    return this.auth.findeOne(session.userId);
  }


}
