import { Test, TestingModule } from '@nestjs/testing';
import { PromoOffersService } from './promo-offers.service';

describe('PromoOffersService', () => {
  let service: PromoOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoOffersService],
    }).compile();

    service = module.get<PromoOffersService>(PromoOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
