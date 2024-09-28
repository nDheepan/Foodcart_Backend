import { Test, TestingModule } from '@nestjs/testing';
import { ProductAddOnsController } from './product_add-ons.controller';
import { ProductAddOnsService } from './product_add-ons.service';

describe('ProductAddOnsController', () => {
  let controller: ProductAddOnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductAddOnsController],
      providers: [ProductAddOnsService],
    }).compile();

    controller = module.get<ProductAddOnsController>(ProductAddOnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
