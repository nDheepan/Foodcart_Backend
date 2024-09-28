import { Test, TestingModule } from '@nestjs/testing';
import { AgentauthService } from './agentauth.service';

describe('AgentauthService', () => {
  let service: AgentauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentauthService],
    }).compile();

    service = module.get<AgentauthService>(AgentauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
