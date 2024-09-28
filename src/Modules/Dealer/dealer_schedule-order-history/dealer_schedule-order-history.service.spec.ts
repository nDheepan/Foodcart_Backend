import { Test, TestingModule } from '@nestjs/testing';
import { DealerScheduleOrderHistoryService } from './dealer_schedule-order-history.service';

describe('DealerScheduleOrderHistoryService', () => {
  let service: DealerScheduleOrderHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerScheduleOrderHistoryService],
    }).compile();

    service = module.get<DealerScheduleOrderHistoryService>(DealerScheduleOrderHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
