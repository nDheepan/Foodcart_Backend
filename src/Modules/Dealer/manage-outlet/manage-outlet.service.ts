import { Injectable } from '@nestjs/common';
import { CreateManageOutletDto } from '../../../dtos/create-manage-outlet.dto';
import { UpdateManageOutletDto } from '../../../dtos/update-manage-outlet.dto';
import { DealerAuthService } from '../dealer_auth/dealer_auth.service';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import { RestaurantSlotTimingService } from '../restaurant_slot-timing/restaurant_slot-timing.service';
import { UpdateRestaurantSlotTimingDto } from 'src/dtos/update-restaurant_slot-timing.dto';

@Injectable()
export class ManageOutletService {
  constructor (private readonly dealerService:DealerDetailsService,
    private readonly slotService:RestaurantSlotTimingService,
    ){}
  
  

  findAll() {
    return `This action returns all manageOutlet`;
  }

  async findOne(id: string) {
    const info = await this.dealerService.getUser(id);
    return {restaurant_name:info.restaurant_name,cuisine:info.cuisine,
      restaurant_type:info.restaurant_type,restaurant_category:info.restaurant_category,
      restaurant_address:info.restaurant_address,restaurant_mobileno:info.restaurant_mobileno,
      no_fssai:info.no_fssai,no_gst:info.no_gst,ratings:info.ratings
    }
  }

  async getTimings(id: string) {
    return  this.slotService.findAll(id);
    
  } 

  

  async getPhone(id: string) {
    const Phone =await  this.dealerService.getUser(id);
    return {contact1:Phone.restaurant_mobileno,contact2:Phone.user_mobile}
  } 
  
  async updateData(id: string, data:any) {
    return this.dealerService.updateUser(id,data);
  }

  async updateTiming(id:string,dealerid:any,SlotDto:UpdateRestaurantSlotTimingDto){
    SlotDto.dealer = dealerid;
    const dealer = await this.slotService.update(id,SlotDto)
    return {message:"timing slot updated successfully",dealer}
  }

  async remove(id: number) {
    return `This action removes a #${id} manageOutlet`;
  }
}
