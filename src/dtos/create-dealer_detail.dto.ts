import { Transform } from "class-transformer";
import { IsEmail, IsEmpty,Length, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate, maxLength, IsBoolean, IsOptional, IsDate, IsArray, minLength, matches, IsMobilePhone, IsPhoneNumber, IsNumberString } from "class-validator";
import { ValidateMobileNumber } from "src/decorators/validate";



export class CreateDealerDto{


  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/,{message:"username to weak"})
  @MinLength(3,{message:"minimum 3 characters allowed for username"})
  username:string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s,'-]+$/, { message: 'Invalid address format' })
  user_address:string;

  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsNumber({}, { message: 'Mobile number must be a valid number' })
  @Validate(ValidateMobileNumber,{message:"please enter valid number"})
   user_mobile: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z,A-Z]+$/,{message:"please enter valid restaurant name"})
  restaurant_name:string;
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/,{message:"enter valid restaurant type "})
  restaurant_type:string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/,{message:"enter valid restaurant category "})
  restaurant_category:string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s,'-]+$/, { message: 'Invalid restaurant address format' })
  restaurant_address:string;


  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsNumber() 
  @Validate(ValidateMobileNumber,{message:"please enter valid number"})
  restaurant_mobileno:number;

 
  

  @IsOptional()
  @MinLength(6,{message:'password atleast 6 characters'})
  @MaxLength(19,{message:'maximum 15 characters'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:"password to weak"})
  password:string;   

  
  @IsNotEmpty()
  @IsEmail()
  emailid:string;

  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6}$/, { message: 'Invalid opening timestamp format' })
  opens_at:string;
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6}$/, { message: 'Invalid closing timestamp format' })
  closes_at:string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z , A-Z]+$/,{message:"days must be a string"})
  days_available:string;


  @IsOptional()
  @IsString()
  latitude:string;

  @IsOptional()
  @IsString()
  longitude:string;

  

  @IsOptional()
  @IsBoolean()
  is_active: boolean = true;

  

  
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/,{message:"please enter valid pan name" })
  name_pan:string;
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,{message:"please enter valid pan number"})
  no_pan:string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s,'-]+$/, { message: 'Invalid address format' })
  address_pan: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$/,{message:"please enter valid gst number"})
  no_gst:string;

  @IsNotEmpty()
  @IsNumber()
  no_fssai:number;

  @IsNotEmpty()
  @IsString()
  expdate_fssai:string;


  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsString()
  reset:string;


  @IsString()
  images:string;  
  
  @IsNotEmpty()
  @IsString()
  cuisine:string;

  @IsOptional()
  @IsNumber()
  ratings:number

  @IsOptional()
  @IsString()
  role:string;

  @IsOptional()
  @IsBoolean()
  rush_hour:boolean;

  @IsOptional()
  @IsBoolean()
  schedule:boolean;

  @IsOptional()
  @IsBoolean()
  takeaway:boolean;

  @IsOptional()
  @IsBoolean()
  dinning:boolean;

  @IsOptional()
  @IsBoolean()
  delivery:boolean;

  @IsOptional()
  @IsBoolean()
  schedule_order:boolean;  
  


}