import { Test, TestingModule } from '@nestjs/testing';
import { DealerNotificationController } from './dealer_notification.controller';
import { DealerNotificationService } from './dealer_notification.service';

describe('DealerNotificationController', () => {
  let controller: DealerNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerNotificationController],
      providers: [DealerNotificationService],
    }).compile();

    controller = module.get<DealerNotificationController>(DealerNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
