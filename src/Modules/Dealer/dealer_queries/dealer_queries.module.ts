import { Module } from '@nestjs/common';
import { DealerQueriesService } from './dealer_queries.service';
import { DealerQueriesController } from './dealer_queries.controller';

@Module({
  controllers: [DealerQueriesController],
  providers: [DealerQueriesService],
})
export class DealerQueriesModule {}
