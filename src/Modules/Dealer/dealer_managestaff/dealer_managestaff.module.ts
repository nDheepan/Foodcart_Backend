import { Module } from '@nestjs/common';
import { DealerManagestaffService } from './dealer_managestaff.service';
import { DealerManagestaffController } from './dealer_managestaff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerManagestaff } from '../../../entities/dealer_managestaff.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DealerManagestaff])],
  controllers: [DealerManagestaffController],
  providers: [DealerManagestaffService],
  exports:[DealerManagestaffService]
})
export class DealerManagestaffModule {}
