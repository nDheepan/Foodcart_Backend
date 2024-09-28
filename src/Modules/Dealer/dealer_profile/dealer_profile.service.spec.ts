import { Test, TestingModule } from '@nestjs/testing';
import { DealerProfileService } from './dealer_profile.service';

describe('DealerProfileService', () => {
  let service: DealerProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerProfileService],
    }).compile();

    service = module.get<DealerProfileService>(DealerProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
