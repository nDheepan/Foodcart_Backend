import { Test, TestingModule } from '@nestjs/testing';
import { ManageOutletController } from './manage-outlet.controller';
import { ManageOutletService } from './manage-outlet.service';

describe('ManageOutletController', () => {
  let controller: ManageOutletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageOutletController],
      providers: [ManageOutletService],
    }).compile();

    controller = module.get<ManageOutletController>(ManageOutletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
