import { Module } from '@nestjs/common';
import { DealerToAdminComplientsService } from './dealer_to-admin-complients.service';
import { DealerToAdminComplientsController } from './dealer_to-admin-complients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerToAdminComplient } from '../../../entities/dealer_to-admin-complient.entity';

@Module({
  imports:[DealerToAdminComplientsModule,TypeOrmModule.forFeature([DealerToAdminComplient])],
  controllers: [DealerToAdminComplientsController],
  providers: [DealerToAdminComplientsService],
  exports:[DealerToAdminComplientsService]
})
export class DealerToAdminComplientsModule {}
