import { Test, TestingModule } from '@nestjs/testing';
import { DealerComplientsController } from './dealer_complients.controller';
import { DealerComplientsService } from './dealer_complients.service';

describe('DealerComplientsController', () => {
  let controller: DealerComplientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerComplientsController],
      providers: [DealerComplientsService],
    }).compile();

    controller = module.get<DealerComplientsController>(DealerComplientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
