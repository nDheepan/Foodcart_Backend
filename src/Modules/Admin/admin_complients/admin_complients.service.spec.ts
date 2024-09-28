import { Test, TestingModule } from '@nestjs/testing';
import { AdminComplientsService } from './admin_complients.service';

describe('AdminComplientsService', () => {
  let service: AdminComplientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminComplientsService],
    }).compile();

    service = module.get<AdminComplientsService>(AdminComplientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
