import { Test, TestingModule } from '@nestjs/testing';
import { DealerOrderHistoryService } from './dealer_order_history.service';

describe('DealerOrderHistoryService', () => {
  let service: DealerOrderHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerOrderHistoryService],
    }).compile();

    service = module.get<DealerOrderHistoryService>(DealerOrderHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
