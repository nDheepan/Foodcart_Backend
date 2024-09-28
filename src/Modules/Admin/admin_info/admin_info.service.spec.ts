import { Test, TestingModule } from '@nestjs/testing';
import { AdminInfoService } from './admin_info.service';

describe('AdminInfoService', () => {
  let service: AdminInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminInfoService],
    }).compile();

    service = module.get<AdminInfoService>(AdminInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
