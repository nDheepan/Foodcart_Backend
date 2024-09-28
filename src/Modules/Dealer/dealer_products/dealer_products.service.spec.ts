import { Test, TestingModule } from '@nestjs/testing';
import { DealerProductsService } from './dealer_products.service';

describe('DealerProductsService', () => {
  let service: DealerProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerProductsService],
    }).compile();

    service = module.get<DealerProductsService>(DealerProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
