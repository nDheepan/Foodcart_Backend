import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSlotTimingService } from './restaurant_slot-timing.service';

describe('RestaurantSlotTimingService', () => {
  let service: RestaurantSlotTimingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantSlotTimingService],
    }).compile();

    service = module.get<RestaurantSlotTimingService>(RestaurantSlotTimingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
