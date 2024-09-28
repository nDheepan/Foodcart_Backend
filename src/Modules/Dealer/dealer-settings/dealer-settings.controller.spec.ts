import { Test, TestingModule } from '@nestjs/testing';
import { DealerSettingsController } from './dealer-settings.controller';
import { DealerSettingsService } from './dealer-settings.service';

describe('DealerSettingsController', () => {
  let controller: DealerSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerSettingsController],
      providers: [DealerSettingsService],
    }).compile();

    controller = module.get<DealerSettingsController>(DealerSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
