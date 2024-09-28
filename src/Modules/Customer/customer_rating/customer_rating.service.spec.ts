import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRatingService } from './customer_rating.service';

describe('CustomerRatingService', () => {
  let service: CustomerRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerRatingService],
    }).compile();

    service = module.get<CustomerRatingService>(CustomerRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
