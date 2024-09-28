import { Test, TestingModule } from '@nestjs/testing';
import { CustomerfilterController } from './customerfilter.controller';

describe('CustomerfilterController', () => {
  let controller: CustomerfilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerfilterController],
    }).compile();

    controller = module.get<CustomerfilterController>(CustomerfilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
