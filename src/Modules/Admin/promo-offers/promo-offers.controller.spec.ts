import { Test, TestingModule } from '@nestjs/testing';
import { PromoOffersController } from './promo-offers.controller';
import { PromoOffersService } from './promo-offers.service';

describe('PromoOffersController', () => {
  let controller: PromoOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoOffersController],
      providers: [PromoOffersService],
    }).compile();

    controller = module.get<PromoOffersController>(PromoOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
