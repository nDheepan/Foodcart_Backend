import { Test, TestingModule } from '@nestjs/testing';
import { DealerRatingService } from './dealer_rating.service';

describe('DealerRatingService', () => {
  let service: DealerRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerRatingService],
    }).compile();

    service = module.get<DealerRatingService>(DealerRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
