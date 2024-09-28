import { Test, TestingModule } from '@nestjs/testing';
import { DealerStatusController } from './dealer_status.controller';
import { DealerStatusService } from './dealer_status.service';

describe('DealerStatusController', () => {
  let controller: DealerStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerStatusController],
      providers: [DealerStatusService],
    }).compile();

    controller = module.get<DealerStatusController>(DealerStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
