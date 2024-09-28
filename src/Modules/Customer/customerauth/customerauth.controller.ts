import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards,Request} from '@nestjs/common';
import { CustomerauthService } from './customerauth.service';
import { Response } from 'express';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { CreateCustomerDetailDto } from 'src/dtos/customer-detail.dto';

@Controller()
export class CustomerauthController {
    constructor(private authService: CustomerauthService) {}
  @UseGuards(jwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
@Post('login')
async sendAndVerifyOTP(
    @Body() dto:CreateCustomerDetailDto,
    @Res() res: Response
): Promise<any> {
    const { mobileno, otp} = dto;
    if (!otp) {
        const generatedOTP = await this.authService.SendOTP(dto);
        return res.status(HttpStatus.OK).json({ message: 'OTP sent successfully', mobileno, otp: generatedOTP });
    } else {
        const isVerified = await this.authService.verifyOTP(dto);
        if (!isVerified) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'OTP verification failed' });
        }
        const accessToken = await this.authService.generateToken(mobileno);
        let users
        const responsebody = { mobileno, accessToken,};
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        users=res.status(HttpStatus.OK).json(responsebody).send()
       console.log(users)
        }
    }
    @Post('refresh-token')
    async refreshToken(@Body() body: { mobileno: number, token: string },@Res() res:Response): Promise<{ newToken: string }> {
      const { mobileno, token } = body;
      const newToken = await this.authService.refreshToken(mobileno, token);
      res.setHeader('Authorization', `Bearer ${newToken}`);
     const user= res.status(HttpStatus.OK).send()
     console.log(user)
      return {newToken}
    }
}
