import { Module } from '@nestjs/common';
import { DealerSettingsService } from './dealer-settings.service';
import { DealerSettingsController } from './dealer-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
import DealerNotifications from '../../../entities/dealer_Notifications.entity';

@Module({
  imports:[dealerDetailsModule,TypeOrmModule.forFeature([DealerNotifications])],
  controllers: [DealerSettingsController],
  providers: [DealerSettingsService],
})
export class DealerSettingsModule {}
