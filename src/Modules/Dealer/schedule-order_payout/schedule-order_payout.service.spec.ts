import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleOrderPayoutService } from './schedule-order_payout.service';

describe('ScheduleOrderPayoutService', () => {
  let service: ScheduleOrderPayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleOrderPayoutService],
    }).compile();

    service = module.get<ScheduleOrderPayoutService>(ScheduleOrderPayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
