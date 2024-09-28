import { Module } from '@nestjs/common';
import { DealerNotificationService } from './dealer_notification.service';
import { DealerNotificationController } from './dealer_notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { AdminNotificationModule } from 'src/Modules/Admin/admin_notification/admin_notification.module';

@Module({
  imports:[AdminNotificationModule,TypeOrmModule.forFeature([Dealer_Entity])],
  controllers: [DealerNotificationController],
  providers: [DealerNotificationService],
  exports:[DealerNotificationService]
})
export class DealerNotificationModule {}
