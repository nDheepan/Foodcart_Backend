import { Test, TestingModule } from '@nestjs/testing';
import { DealerOrderHistoryController } from './dealer_order_history.controller';
import { DealerOrderHistoryService } from './dealer_order_history.service';

describe('DealerOrderHistoryController', () => {
  let controller: DealerOrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerOrderHistoryController],
      providers: [DealerOrderHistoryService],
    }).compile();

    controller = module.get<DealerOrderHistoryController>(DealerOrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
