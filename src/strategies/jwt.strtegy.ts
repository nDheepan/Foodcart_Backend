import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../constants';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { DealerDetailsService } from 'src/Modules/Dealer/dealer_details/dealer_details.service';
import { RatingService } from 'src/Modules/rating/rating.service';
import { DealerRatingService } from 'src/Modules/Dealer/dealer_rating/dealer_rating.service';
import { CustomerdetailService } from 'src/Modules/Customer/customerdetail/customerdetail.service';
import { AgentService } from 'src/Modules/delivery_agent/agent/agent.service';
@Injectable()

export class customerStrategy extends PassportStrategy(Strategy,'customer') {
  constructor(
           private customerdetailService:CustomerdetailService,
           private ConfigService:ConfigService
    ){   super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:jwtConstants.customer_secret,
    });
    this.customerdetailService=customerdetailService
  
  }
    async validate(payload: any) {
    const user=await this.customerdetailService.get(payload.userid) ;
    if(!user){
      throw new UnauthorizedException;
    }

    return {id:user.userid,mobile:user.mobileno};
  }
}
  @Injectable()
  export class DealerStrategy extends PassportStrategy(Strategy, 'dealer') {
    constructor(private dealerDetailService: DealerDetailsService,private ConfigService:ConfigService,
      private dealerRating:DealerRatingService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:jwtConstants.dealer_secret,
      });
      this.dealerDetailService=dealerDetailService;
    }
    async validate(payload: any) {
   
      
     const result = await this.dealerDetailService.getUser(payload.dealerid);
        if (!result) {
          throw new UnauthorizedException();
        }
  else{
    if(payload.staffid){
      return {  dealerid:payload.dealerid,role:payload.role,employeeid:payload.staffid};


    }
     else{
      return {  dealerid:result.id,role:result.role};

     }
  
}

  }
}

@Injectable()
export class AgentStrategy extends PassportStrategy(Strategy,'agent'){
    constructor(private agentService:AgentService){
      super({
         jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey:jwtConstants.agent_secret,
      });
      this.agentService=agentService;
    }
    async validate(payload:any){
       const agent=await this.agentService.findOne(payload.id)
       if(!agent){
         throw new UnauthorizedException()
       }
       else{
         return {id:agent.id,mobile:agent.mobile}
       }
    }
}