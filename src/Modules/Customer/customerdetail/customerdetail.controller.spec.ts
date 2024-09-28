import { Test, TestingModule } from '@nestjs/testing';
import { CustomerdetailController } from './customerdetail.controller';

describe('CustomerdetailController', () => {
  let controller: CustomerdetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerdetailController],
    }).compile();

    controller = module.get<CustomerdetailController>(CustomerdetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
