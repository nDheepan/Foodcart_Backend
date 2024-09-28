import { Test, TestingModule } from '@nestjs/testing';
import { DealerProductsController } from './dealer_products.controller';
import { DealerProductsService } from './dealer_products.service';

describe('DealerProductsController', () => {
  let controller: DealerProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerProductsController],
      providers: [DealerProductsService],
    }).compile();

    controller = module.get<DealerProductsController>(DealerProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
