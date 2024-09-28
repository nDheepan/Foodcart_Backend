import { Test, TestingModule } from '@nestjs/testing';
import { DealerManagestaffController } from './dealer_managestaff.controller';
import { DealerManagestaffService } from './dealer_managestaff.service';

describe('DealerManagestaffController', () => {
  let controller: DealerManagestaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerManagestaffController],
      providers: [DealerManagestaffService],
    }).compile();

    controller = module.get<DealerManagestaffController>(DealerManagestaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
