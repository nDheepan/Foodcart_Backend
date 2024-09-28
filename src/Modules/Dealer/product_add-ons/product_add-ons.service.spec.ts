import { Test, TestingModule } from '@nestjs/testing';
import { ProductAddOnsService } from './product_add-ons.service';

describe('ProductAddOnsService', () => {
  let service: ProductAddOnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductAddOnsService],
    }).compile();

    service = module.get<ProductAddOnsService>(ProductAddOnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
