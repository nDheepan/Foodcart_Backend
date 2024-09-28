import { Test, TestingModule } from '@nestjs/testing';
import { AdminInfoController } from './admin_info.controller';
import { AdminInfoService } from './admin_info.service';

describe('AdminInfoController', () => {
  let controller: AdminInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminInfoController],
      providers: [AdminInfoService],
    }).compile();

    controller = module.get<AdminInfoController>(AdminInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
