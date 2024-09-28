import { Test, TestingModule } from '@nestjs/testing';
import { DealerProfileController } from './dealer_profile.controller';
import { DealerProfileService } from './dealer_profile.service';

describe('DealerProfileController', () => {
  let controller: DealerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerProfileController],
      providers: [DealerProfileService],
    }).compile();

    controller = module.get<DealerProfileController>(DealerProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
