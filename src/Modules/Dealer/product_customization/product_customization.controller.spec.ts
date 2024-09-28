import { Test, TestingModule } from '@nestjs/testing';
import { ProductCustomizationController } from './product_customization.controller';
import { ProductCustomizationService } from './product_customization.service';

describe('ProductCustomizationController', () => {
  let controller: ProductCustomizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCustomizationController],
      providers: [ProductCustomizationService],
    }).compile();

    controller = module.get<ProductCustomizationController>(ProductCustomizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
