import { Test, TestingModule } from '@nestjs/testing';
import { DealerQueriesService } from './dealer_queries.service';

describe('DealerQueriesService', () => {
  let service: DealerQueriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerQueriesService],
    }).compile();

    service = module.get<DealerQueriesService>(DealerQueriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
