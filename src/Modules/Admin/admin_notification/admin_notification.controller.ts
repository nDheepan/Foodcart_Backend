import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminNotificationService } from './admin_notification.service';
import { CreateAdminNotificationDto } from '../../../dtos/create-admin_notification.dto';
import { UpdateAdminNotificationDto } from '../../../dtos/update-admin_notification.dto';

@Controller()
export class AdminNotificationController {
  constructor(private readonly adminNotificationService: AdminNotificationService) {}

  @Post('notificationCreate/:adminid/:dealerid')
    create(    @Param("dealerid") dealerid:any,@Param("adminid") adminid:any
    ,@Body() createAdminNotificationDto: CreateAdminNotificationDto) {
      createAdminNotificationDto.admin  = adminid;
      createAdminNotificationDto.dealer = dealerid;
      return this.adminNotificationService.create(createAdminNotificationDto);
  }

  @Get()
  findAll() {
    return this.adminNotificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminNotificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminNotificationDto: UpdateAdminNotificationDto) {
    return this.adminNotificationService.update(+id, updateAdminNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminNotificationService.remove(+id);
  }
}

