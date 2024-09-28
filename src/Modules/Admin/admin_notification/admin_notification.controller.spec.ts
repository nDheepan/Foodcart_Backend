import { Test, TestingModule } from '@nestjs/testing';
import { AdminNotificationController } from './admin_notification.controller';
import { AdminNotificationService } from './admin_notification.service';

describe('AdminNotificationController', () => {
  let controller: AdminNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminNotificationController],
      providers: [AdminNotificationService],
    }).compile();

    controller = module.get<AdminNotificationController>(AdminNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
