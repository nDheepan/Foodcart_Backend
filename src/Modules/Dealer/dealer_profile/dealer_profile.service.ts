import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDealerProfileDto } from '../../../dtos/create-dealer_profile.dto';
import { UpdateDealerProfileDto } from '../../../dtos/update-dealer_profile.dto';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import { UpdateDealerDetailDto } from 'src/dtos/update-dealer_detail.dto';

@Injectable()
export class DealerProfileService {
 constructor(private readonly dealerservice :DealerDetailsService){}

    async getInfo(dealerid:string){
        const userinfo = await this.dealerservice.getUser(dealerid);

        const  restaurantname = userinfo.restaurant_name;
        const  email = userinfo.emailid;
        const  mobile = userinfo.user_mobile;
            if(userinfo){return {restaurantname,email,mobile}}
            else{throw new BadRequestException()}
    }
    
    async update(id:string,data:UpdateDealerDetailDto){
        const result = await this.dealerservice.updateUser(id,data);
            if(result){return result}
            else{throw new BadRequestException()}

    }

  
 }
