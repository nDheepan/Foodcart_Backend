import { Test, TestingModule } from '@nestjs/testing';
import { DealerQueriesController } from './dealer_queries.controller';
import { DealerQueriesService } from './dealer_queries.service';

describe('DealerQueriesController', () => {
  let controller: DealerQueriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerQueriesController],
      providers: [DealerQueriesService],
    }).compile();

    controller = module.get<DealerQueriesController>(DealerQueriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
