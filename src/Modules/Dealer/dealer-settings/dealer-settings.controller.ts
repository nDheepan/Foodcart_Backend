import { Controller, Get,Request,Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DealerSettingsService } from './dealer-settings.service';
import { CreateDealerSettingDto } from '../../../dtos/create-dealer-setting.dto';
import { UpdateDealerSettingDto } from '../../../dtos/update-dealer-setting.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN)
@Controller()
export class DealerSettingsController {
  constructor(private readonly dealerSettingsService: DealerSettingsService) {}

  
  @Post('rushhour-off')
  async rushhour(@Request() req,@Body() createSettingDto:CreateDealerSettingDto){
    const id = req.user.dealerid;
    createSettingDto.timetake = createSettingDto.timetake * 60;
    return this.dealerSettingsService.addReason(id,createSettingDto);

  }

  @Post('schedule-off')
  async schedule(@Request() req,@Body('status') status:boolean, ){
    const id = req.user.dealerid;
    const statuss = status;
    return this.dealerSettingsService.updateSchedule(id,statuss);

  }
  
}
