import { Module } from '@nestjs/common';
import { AdminInfoService } from './admin_info.service';
import { AdminInfoController } from './admin_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminInfo } from '../../../entities/admin_info.entity';
import { AdminNotificationModule } from '../admin_notification/admin_notification.module';

@Module({
  imports:[AdminNotificationModule,TypeOrmModule.forFeature([AdminInfo])],
  controllers: [AdminInfoController],
  providers: [AdminInfoService],
})
export class AdminInfoModule {}
