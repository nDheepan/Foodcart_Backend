import { Test, TestingModule } from '@nestjs/testing';
import { DealerAuthController } from './dealer_auth.controller';
import { DealerAuthService } from './dealer_auth.service';

describe('DealerAuthController', () => {
  let controller: DealerAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerAuthController],
      providers: [DealerAuthService],
    }).compile();

    controller = module.get<DealerAuthController>(DealerAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
