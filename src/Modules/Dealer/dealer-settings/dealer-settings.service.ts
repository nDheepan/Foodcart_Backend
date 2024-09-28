import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDealerSettingDto } from '../../../dtos/create-dealer-setting.dto';
import { UpdateDealerSettingDto } from '../../../dtos/update-dealer-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import DealerNotifications from '../../../entities/dealer_Notifications.entity';
import { delay } from 'rxjs';

@Injectable()
export class DealerSettingsService {
  constructor(@InjectRepository(DealerNotifications)
    private readonly dealerSettingRepo:Repository<DealerNotifications>,
  private readonly dealerService : DealerDetailsService
  ){}
  
  async addReason(id:any,createSettingDto:CreateDealerSettingDto) {

    const status = false;
    createSettingDto.dealer = id;
    await this.dealerService.updateUser(id,{rush_hour:status})
    const time = new Promise((resolve) => {
      setTimeout(() => {  
        const status = true;
        const result = this.dealerService.updateUser(id,{rush_hour:status})
        console.log("updated");
        resolve(1);
      }, createSettingDto.timetake * 1000);
    });
    createSettingDto.timetake = createSettingDto.timetake / 60;
    const result2 = this.dealerSettingRepo.save(createSettingDto)
    return `rush hour update on ${createSettingDto.timetake } mints`

    }

  async updateSchedule(id:any,status:boolean)
  {
    return this.dealerService.updateUser(id,{schedule:status})
  }
  
}
