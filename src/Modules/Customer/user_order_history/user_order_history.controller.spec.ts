import { Test, TestingModule } from '@nestjs/testing';
import { UserOrderHistoryController } from './user_order_history.controller';

describe('UserOrderHistoryController', () => {
  let controller: UserOrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOrderHistoryController],
    }).compile();

    controller = module.get<UserOrderHistoryController>(UserOrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
