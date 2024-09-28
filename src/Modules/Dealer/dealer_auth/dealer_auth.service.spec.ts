import { Test, TestingModule } from '@nestjs/testing';
import { DealerAuthService } from './dealer_auth.service';

describe('DealerAuthService', () => {
  let service: DealerAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerAuthService],
    }).compile();

    service = module.get<DealerAuthService>(DealerAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
