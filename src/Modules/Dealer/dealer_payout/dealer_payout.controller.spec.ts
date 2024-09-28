import { Test, TestingModule } from '@nestjs/testing';
import { DealerPayoutController } from './dealer_payout.controller';
import { DealerPayoutService } from './dealer_payout.service';

describe('DealerPayoutController', () => {
  let controller: DealerPayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerPayoutController],
      providers: [DealerPayoutService],
    }).compile();

    controller = module.get<DealerPayoutController>(DealerPayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
