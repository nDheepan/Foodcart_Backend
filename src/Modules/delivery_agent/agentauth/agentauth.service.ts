import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AgentService } from '../agent/agent.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AgentauthService {
  constructor(
         private agentService:AgentService,
         private jwtService:JwtService
   ){}
  async validateAgent(mobile:number,devl:number):Promise<any>{
    const agent = await this.agentService.getAgent(mobile);
       if(!agent)
       {
         throw new UnauthorizedException("Agent not found");
       }
       else{
           const devlotp = parseInt(process.env.DEVLOTP);  
       if(devl === devlotp){
        const {...result}= agent;
        const payload={id:agent.id};
         return {
           access_token:this.jwtService.sign(payload)
         } 
        }  
         else{
         throw new UnauthorizedException('unauthorized access');
       }
     }
  }
 
}
