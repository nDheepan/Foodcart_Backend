import { Test, TestingModule } from '@nestjs/testing';
import { DealerSettingsService } from './dealer-settings.service';

describe('DealerSettingsService', () => {
  let service: DealerSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerSettingsService],
    }).compile();

    service = module.get<DealerSettingsService>(DealerSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
