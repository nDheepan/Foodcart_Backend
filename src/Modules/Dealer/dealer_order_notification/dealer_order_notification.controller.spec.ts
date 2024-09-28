import { Test, TestingModule } from '@nestjs/testing';
import { DealerOrderNotificationController } from './dealer_order_notification.controller';
import { DealerOrderNotificationService } from './dealer_order_notification.service';

describe('DealerOrderNotificationController', () => {
  let controller: DealerOrderNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerOrderNotificationController],
      providers: [DealerOrderNotificationService],
    }).compile();

    controller = module.get<DealerOrderNotificationController>(DealerOrderNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
