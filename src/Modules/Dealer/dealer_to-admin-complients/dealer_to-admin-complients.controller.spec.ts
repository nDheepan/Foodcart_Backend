import { Test, TestingModule } from '@nestjs/testing';
import { DealerToAdminComplientsController } from './dealer_to-admin-complients.controller';
import { DealerToAdminComplientsService } from './dealer_to-admin-complients.service';

describe('DealerToAdminComplientsController', () => {
  let controller: DealerToAdminComplientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerToAdminComplientsController],
      providers: [DealerToAdminComplientsService],
    }).compile();

    controller = module.get<DealerToAdminComplientsController>(DealerToAdminComplientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
