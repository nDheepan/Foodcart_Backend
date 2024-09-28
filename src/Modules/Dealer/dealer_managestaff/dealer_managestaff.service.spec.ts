import { Test, TestingModule } from '@nestjs/testing';
import { DealerManagestaffService } from './dealer_managestaff.service';

describe('DealerManagestaffService', () => {
  let service: DealerManagestaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerManagestaffService],
    }).compile();

    service = module.get<DealerManagestaffService>(DealerManagestaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
