import { Test, TestingModule } from '@nestjs/testing';
import { DealerDetailsService } from './dealer_details.service';

describe('DealerDetailsService', () => {
  let service: DealerDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerDetailsService],
    }).compile();

    service = module.get<DealerDetailsService>(DealerDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
