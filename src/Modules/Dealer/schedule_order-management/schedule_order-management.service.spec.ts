import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleOrderManagementService } from './schedule_order-management.service';

describe('ScheduleOrderManagementService', () => {
  let service: ScheduleOrderManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleOrderManagementService],
    }).compile();

    service = module.get<ScheduleOrderManagementService>(ScheduleOrderManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
