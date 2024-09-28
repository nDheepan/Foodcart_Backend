import { Test, TestingModule } from '@nestjs/testing';
import { DealerPayoutService } from './dealer_payout.service';

describe('DealerPayoutService', () => {
  let service: DealerPayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerPayoutService],
    }).compile();

    service = module.get<DealerPayoutService>(DealerPayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
