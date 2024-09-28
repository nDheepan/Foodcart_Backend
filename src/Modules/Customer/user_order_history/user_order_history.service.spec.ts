import { Test, TestingModule } from '@nestjs/testing';
import { UserOrderHistoryService } from './user_order_history.service';

describe('UserOrderHistoryService', () => {
  let service: UserOrderHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOrderHistoryService],
    }).compile();

    service = module.get<UserOrderHistoryService>(UserOrderHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
