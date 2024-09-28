import { Test, TestingModule } from '@nestjs/testing';
import { DealerComplientsService } from './dealer_complients.service';

describe('DealerComplientsService', () => {
  let service: DealerComplientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerComplientsService],
    }).compile();

    service = module.get<DealerComplientsService>(DealerComplientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
