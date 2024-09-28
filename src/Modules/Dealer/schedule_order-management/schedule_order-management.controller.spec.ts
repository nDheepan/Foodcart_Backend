import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleOrderManagementController } from './schedule_order-management.controller';
import { ScheduleOrderManagementService } from './schedule_order-management.service';

describe('ScheduleOrderManagementController', () => {
  let controller: ScheduleOrderManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleOrderManagementController],
      providers: [ScheduleOrderManagementService],
    }).compile();

    controller = module.get<ScheduleOrderManagementController>(ScheduleOrderManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
