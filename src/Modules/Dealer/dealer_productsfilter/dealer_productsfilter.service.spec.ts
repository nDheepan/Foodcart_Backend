import { Test, TestingModule } from '@nestjs/testing';
import { DealerProductsfilterService } from './dealer_productsfilter.service';

describe('DealerProductsfilterService', () => {
  let service: DealerProductsfilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerProductsfilterService],
    }).compile();

    service = module.get<DealerProductsfilterService>(DealerProductsfilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
