import { Test, TestingModule } from '@nestjs/testing';
import { ManageOutletService } from './manage-outlet.service';

describe('ManageOutletService', () => {
  let service: ManageOutletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageOutletService],
    }).compile();

    service = module.get<ManageOutletService>(ManageOutletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
