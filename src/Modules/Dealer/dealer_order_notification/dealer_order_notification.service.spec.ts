import { Test, TestingModule } from '@nestjs/testing';
import { DealerOrderNotificationService } from './dealer_order_notification.service';

describe('DealerOrderNotificationService', () => {
  let service: DealerOrderNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerOrderNotificationService],
    }).compile();

    service = module.get<DealerOrderNotificationService>(DealerOrderNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
