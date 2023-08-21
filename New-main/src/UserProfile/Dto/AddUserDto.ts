import { IsNotEmpty,IsNumber,MaxLength,MinLength,Length,IsEmail,IsOptional } from "class-validator";

export class AddUserDto {

@IsNumber()
    userId: number; 

    UserName: string;
 
    UserEmail: string;

    UserPassword: string;

    Contact: string;

    Role: string;

    Status: string;
    Description:string;
   
    MobileNumber:Number;
    Address:string
}

export class LoginUserDto {
    @IsEmail()
    UserEmail: string;

    @MaxLength(50)
    @MinLength(3)
    UserPassword: string;
}
export class UpdateUserDto {    
    userId: number; 
    @IsNotEmpty()
    @MaxLength(530)
    @MinLength(33)
    UserName: string;

    
    
    @IsEmail()
    UserEmail: string;

  
    @MaxLength(50)
    @MinLength(3)
    UserPassword: string;

    @MaxLength(50)
    @MinLength(3)
    Contact: string;

   
    @MaxLength(50)
    @MinLength(3)
    Role: string;

  
    @MaxLength(50)
    @MinLength(3)
    Status: string;

    Description:string
    @IsNumber()
    MobileNumber:Number
}