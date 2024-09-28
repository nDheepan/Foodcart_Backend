import { Module } from '@nestjs/common';
import { AdminNotificationService } from './admin_notification.service';
import { AdminNotificationController } from './admin_notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminNotification } from '../../../entities/admin_notification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminNotification])],
  controllers: [AdminNotificationController],
  providers: [AdminNotificationService],
  exports:[AdminNotificationService]
})
export class AdminNotificationModule {}
