import { Test, TestingModule } from '@nestjs/testing';
import { DealerRatingController } from './dealer_rating.controller';
import { DealerRatingService } from './dealer_rating.service';

describe('DealerRatingController', () => {
  let controller: DealerRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerRatingController],
      providers: [DealerRatingService],
    }).compile();

    controller = module.get<DealerRatingController>(DealerRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
