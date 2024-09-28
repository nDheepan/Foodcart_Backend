import { Body, Controller, Get, Post, UseGuards,Request} from '@nestjs/common';
import { AgentauthService } from './agentauth.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';

@Controller()
export class AgentauthController {
    constructor(
        private agentauthService:AgentauthService
    ){}

    @Post('login')
    async login(@Body('mobile') mobile:number,@Body('otp') otp:number )
    {
        const devl = process.env.SANDBOX;
        const devlotp = parseInt(process.env.DEVLOTP);
        if(devl === 'ON'){
            return this.agentauthService.validateAgent(mobile,devlotp);     
        }
    
    }
    @UseGuards(jwtGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
