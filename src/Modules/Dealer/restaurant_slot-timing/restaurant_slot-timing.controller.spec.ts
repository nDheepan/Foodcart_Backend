import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSlotTimingController } from './restaurant_slot-timing.controller';
import { RestaurantSlotTimingService } from './restaurant_slot-timing.service';

describe('RestaurantSlotTimingController', () => {
  let controller: RestaurantSlotTimingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantSlotTimingController],
      providers: [RestaurantSlotTimingService],
    }).compile();

    controller = module.get<RestaurantSlotTimingController>(RestaurantSlotTimingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
