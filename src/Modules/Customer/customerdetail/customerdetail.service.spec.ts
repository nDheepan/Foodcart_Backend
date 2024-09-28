import { Test, TestingModule } from '@nestjs/testing';
import { CustomerdetailService } from './customerdetail.service';

describe('CustomerdetailService', () => {
  let service: CustomerdetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerdetailService],
    }).compile();

    service = module.get<CustomerdetailService>(CustomerdetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
