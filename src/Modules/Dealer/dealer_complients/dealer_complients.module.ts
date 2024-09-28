import { Module, forwardRef } from '@nestjs/common';
import { DealerComplientsService } from './dealer_complients.service';
import { DealerComplientsController } from './dealer_complients.controller';
import { RatingModule } from 'src/Modules/rating/rating.module';

@Module({
  imports:[forwardRef(()=>RatingModule)],
  controllers: [DealerComplientsController],
  providers: [DealerComplientsService],
})
export class DealerComplientsModule {}
