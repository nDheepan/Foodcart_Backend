import { Test, TestingModule } from '@nestjs/testing';
import { ProductsIngredientsService } from './products_ingredients.service';

describe('ProductsIngredientsService', () => {
  let service: ProductsIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsIngredientsService],
    }).compile();

    service = module.get<ProductsIngredientsService>(ProductsIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
