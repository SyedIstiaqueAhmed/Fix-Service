import {  Body,  Controller,  Delete,  FileTypeValidator,  Get,  MaxFileSizeValidator,  Param,  ParseFilePipe,  ParseIntPipe,  Patch,  Post,  Put,  Query,  Res,  Session,  UnauthorizedException,  UploadedFile,  UseGuards,  UseInterceptors,  UsePipes,  ValidationPipe,} from '@nestjs/common';
import { AdminService } from './Services/AdminService';
import { AddUserDto, LoginUserDto, UpdateUserDto } from './Dto/AddUserDto';
import { User } from './Entity/Admin';
import * as session from 'express-session';
import {Request,Response} from 'express';
import { AuthGuard } from './Authgourd/AuthGurd';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class AdminController {
    constructor(private readonly AdminService: AdminService) {}
    
    @Get('/all')
    async findAll(): Promise<User[]> {
        return await this.AdminService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.AdminService.findOne(id);
    }
    @Post('/create')
    async create(@Body() user: AddUserDto) {
    
        // var deptPassword= bcrypt.hash(user.UserPassword,10);
        // console.log("Controller"+user);
        // console.log(deptPassword);
        // user.UserPassword = deptPassword;
        return await this.AdminService.create(user);
    }
    //@UseGuards(AuthGuard)
    @Put('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() user:UpdateUserDto ): Promise<void> {
        await this.AdminService.update(id, user);
    }
   // @UseGuards(AuthGuard)
    @Delete('/delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        console.log("delete"+id);
        await this.AdminService.delete(id);
    } 
    @Post('/signin')
    async signin(@Body() body: LoginUserDto, @Session() session: any) {
      const user = await this.AdminService.signin(body. UserEmail, body. UserPassword);

      session.userId = user.UserId;
      console.log("signin"+session.userId);
      return user;
    }
    
    @Post('/signout')
   logout(@Session() session: any) {
    console.log("logout"+session.userId);
     session.userId = null;
     session.destroy();
     console.log("logout"+session.userId);
     return { message: 'Signout successful' };
   }
   //http://localhost:3002/user/profile
   @Get('/profile')
   async profile(@Session() session: Record<string, any>) {
     
     const user = await this.AdminService.findOne(session.userId);
     return user + "profile";
   }

    }
function hashPassword(UserPassword: string, arg1: number) {
  throw new Error('Function not implemented.');
}

