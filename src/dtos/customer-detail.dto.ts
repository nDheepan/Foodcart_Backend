import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches, Validate } from "class-validator";
import { ValidateMobileNumber } from "src/decorators/validate";


export class CreateCustomerDetailDto{
    @IsOptional()
    @IsString()
      fullName:string

    @IsOptional()
    @IsString()
      address:string

    @IsOptional()
    @IsString()   
      city:string
     
    @IsOptional()
    @IsNumberString()
    @Length(6,6,{message:'PinCode should be exactly 6 digits long'})
    pincode:number       
     
    @IsOptional()
    @IsString()  
      dob:string       
      
    @IsNotEmpty()
    @IsNumber({}, { message: 'Mobile number must be a valid number' })
    @Validate(ValidateMobileNumber,{message:"enter exact 10 digit mobile number"})
    mobileno: number;
     
     
    @IsOptional()
    @IsNumber()
       otp:number   
     
    @IsOptional()
    @IsEmail() 
       emailid:string
     
    @IsOptional()
    @IsString()
      fcmtoken:string
          
    @IsOptional()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6}$/, { message: 'Invalid created timestamp format' })
       created_at:Date    
}

