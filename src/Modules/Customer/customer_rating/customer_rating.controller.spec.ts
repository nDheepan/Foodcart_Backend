import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRatingController } from './customer_rating.controller';

describe('CustomerRatingController', () => {
  let controller: CustomerRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerRatingController],
    }).compile();

    controller = module.get<CustomerRatingController>(CustomerRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
