import { Test, TestingModule } from '@nestjs/testing';
import { DealerProductsfilterController } from './dealer_productsfilter.controller';
import { DealerProductsfilterService } from './dealer_productsfilter.service';

describe('DealerProductsfilterController', () => {
  let controller: DealerProductsfilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerProductsfilterController],
      providers: [DealerProductsfilterService],
    }).compile();

    controller = module.get<DealerProductsfilterController>(DealerProductsfilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
