import { Test, TestingModule } from '@nestjs/testing';
import { CustomerfilterService } from './customerfilter.service';


describe('customerfilterService', () => {
  let service:CustomerfilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerfilterService],
    }).compile();

    service = module.get<CustomerfilterService>(CustomerfilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
