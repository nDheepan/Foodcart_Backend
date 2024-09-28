import { Test, TestingModule } from '@nestjs/testing';
import { DealerDetailsController } from './dealer_details.controller';
import { DealerDetailsService } from './dealer_details.service';

describe('DealerDetailsController', () => {
  let controller: DealerDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerDetailsController],
      providers: [DealerDetailsService],
    }).compile();

    controller = module.get<DealerDetailsController>(DealerDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
