import { Test, TestingModule } from '@nestjs/testing';
import { AgentOrdernotificationController } from './agent_ordernotification.controller';
import { AgentOrdernotificationService } from './agent_ordernotification.service';

describe('AgentOrdernotificationController', () => {
  let controller: AgentOrdernotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentOrdernotificationController],
      providers: [AgentOrdernotificationService],
    }).compile();

    controller = module.get<AgentOrdernotificationController>(AgentOrdernotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
