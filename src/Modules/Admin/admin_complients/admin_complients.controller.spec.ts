import { Test, TestingModule } from '@nestjs/testing';
import { AdminComplientsController } from './admin_complients.controller';
import { AdminComplientsService } from './admin_complients.service';

describe('AdminComplientsController', () => {
  let controller: AdminComplientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminComplientsController],
      providers: [AdminComplientsService],
    }).compile();

    controller = module.get<AdminComplientsController>(AdminComplientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
