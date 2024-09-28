import { Test, TestingModule } from '@nestjs/testing';
import { ProductCustomizationService } from './product_customization.service';

describe('ProductCustomizationService', () => {
  let service: ProductCustomizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCustomizationService],
    }).compile();

    service = module.get<ProductCustomizationService>(ProductCustomizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
