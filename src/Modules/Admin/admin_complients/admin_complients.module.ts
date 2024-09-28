import { Module } from '@nestjs/common';
import { AdminComplientsService } from './admin_complients.service';
import { AdminComplientsController } from './admin_complients.controller';
import { DealerToAdminComplientsModule } from 'src/Modules/Dealer/dealer_to-admin-complients/dealer_to-admin-complients.module';

@Module({
  imports:[DealerToAdminComplientsModule],
  controllers: [AdminComplientsController],
  providers: [AdminComplientsService],
  exports:[AdminComplientsService]
})
export class AdminComplientsModule {}
