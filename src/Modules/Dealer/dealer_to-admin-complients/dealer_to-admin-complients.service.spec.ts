import { Test, TestingModule } from '@nestjs/testing';
import { DealerToAdminComplientsService } from './dealer_to-admin-complients.service';

describe('DealerToAdminComplientsService', () => {
  let service: DealerToAdminComplientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerToAdminComplientsService],
    }).compile();

    service = module.get<DealerToAdminComplientsService>(DealerToAdminComplientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
