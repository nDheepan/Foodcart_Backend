import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleOrderPayoutController } from './schedule-order_payout.controller';
import { ScheduleOrderPayoutService } from './schedule-order_payout.service';

describe('ScheduleOrderPayoutController', () => {
  let controller: ScheduleOrderPayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleOrderPayoutController],
      providers: [ScheduleOrderPayoutService],
    }).compile();

    controller = module.get<ScheduleOrderPayoutController>(ScheduleOrderPayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
