import { Module, forwardRef } from '@nestjs/common';
import { DealerProfileService } from './dealer_profile.service';
import { DealerProfileController } from './dealer_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from '../../../entities/dealer_detail.entity';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
@Module({


  imports:[dealerDetailsModule,forwardRef(()=>dealerDetailsModule)],
  controllers: [DealerProfileController],
  providers: [DealerProfileService,],
 
})
export class DealerProfileModule {}
