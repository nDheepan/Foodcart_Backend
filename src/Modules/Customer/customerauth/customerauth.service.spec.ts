import { Test, TestingModule } from '@nestjs/testing';
import { CustomerauthService } from './customerauth.service';

describe('CustomerauthService', () => {
  let service: CustomerauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerauthService],
    }).compile();

    service = module.get<CustomerauthService>(CustomerauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
