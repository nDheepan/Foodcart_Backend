import { Test, TestingModule } from '@nestjs/testing';
import { AgentOrdernotificationService } from './agent_ordernotification.service';

describe('AgentOrdernotificationService', () => {
  let service: AgentOrdernotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentOrdernotificationService],
    }).compile();

    service = module.get<AgentOrdernotificationService>(AgentOrdernotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
