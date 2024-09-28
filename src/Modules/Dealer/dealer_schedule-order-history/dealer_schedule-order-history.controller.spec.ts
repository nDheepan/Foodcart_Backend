import { Test, TestingModule } from '@nestjs/testing';
import { DealerScheduleOrderHistoryController } from './dealer_schedule-order-history.controller';
import { DealerScheduleOrderHistoryService } from './dealer_schedule-order-history.service';

describe('DealerScheduleOrderHistoryController', () => {
  let controller: DealerScheduleOrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerScheduleOrderHistoryController],
      providers: [DealerScheduleOrderHistoryService],
    }).compile();

    controller = module.get<DealerScheduleOrderHistoryController>(DealerScheduleOrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
