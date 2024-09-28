import { Test, TestingModule } from '@nestjs/testing';
import { DealerStatusService } from './dealer_status.service';

describe('DealerStatusService', () => {
  let service: DealerStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerStatusService],
    }).compile();

    service = module.get<DealerStatusService>(DealerStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
