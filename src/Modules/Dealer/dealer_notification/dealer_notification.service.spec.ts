import { Test, TestingModule } from '@nestjs/testing';
import { DealerNotificationService } from './dealer_notification.service';

describe('DealerNotificationService', () => {
  let service: DealerNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerNotificationService],
    }).compile();

    service = module.get<DealerNotificationService>(DealerNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
