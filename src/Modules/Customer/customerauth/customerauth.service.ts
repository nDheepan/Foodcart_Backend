import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerdetailService } from '../customerdetail/customerdetail.service';
import { User } from 'src/entities/customer_detail.entity';
import { CreateCustomerDetailDto } from 'src/dtos/customer-detail.dto';

@Injectable()
export class CustomerauthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerdetailService: CustomerdetailService,
    @InjectRepository(User)
      private userRepository:Repository<User>
  ) {}
  async SendOTP(dto:CreateCustomerDetailDto): Promise<number> {
    if (dto.mobileno.toString().length !== 10) {
      throw new BadRequestException('Mobile number should be exactly 10 digits long');
  }

    const generatedOTP = Math.floor(1000+ Math.random() * 9000);
    const user = await this.customerdetailService.findbymobileno(dto.mobileno);
    let users
    if (!user) {
      const newUser = this.userRepository.create({mobileno:dto.mobileno,otp: generatedOTP });
     users= await this.userRepository.save(newUser);
    } else {
      user.otp = generatedOTP;
     users= await this.userRepository.save(user);
    }
    return generatedOTP ;
  }
  async verifyOTP(dto:CreateCustomerDetailDto): Promise<any> {
    const{mobileno,otp}=dto
    const user = await this.customerdetailService.findbymobileno(mobileno);
    if (!user) {
      return false;
    }
    if (mobileno && user.otp === otp) {
        return user;
      }  
  }
  async generateToken(mobileno: number): Promise<string> {
    const user = await this.customerdetailService.findbymobileno(mobileno);
    const payload = { id:user.userid };
    return this.jwtService.signAsync(payload);
    
  }
  async refreshToken(mobileno: number, token: string): Promise<string> {
      const decoded = this.jwtService.decode(token);
      console.log(decoded)
      if (!decoded || typeof decoded !== 'object' || !decoded.hasOwnProperty('exp')) {
        throw new Error('Invalid token');
      }
      const expiresAt = decoded.exp 
      console.log(expiresAt)
      if (expiresAt) {
        const beforeExpiration = 300; 
        console.log(beforeExpiration) 
        const now = Math.round(new Date().getTime() /1000)
        console.log(now)  
        const timeUntilExpiration = expiresAt - now;
        console.log(timeUntilExpiration);
    
        if (timeUntilExpiration < beforeExpiration && timeUntilExpiration <0) {
          return await this.generateToken(mobileno);
        }
    }
    else{
      throw new Error('Invalid token expiration');
    } 
  }
  getUserIdFromToken(token: string): string | null {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded['sub'] || null; // Return null if 'sub' claim is missing
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null; // Return null if decoding fails
    }
  }
}
