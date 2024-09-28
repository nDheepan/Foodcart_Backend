import { Test, TestingModule } from '@nestjs/testing';
import { AgentauthController } from './agentauth.controller';

describe('AgentauthController', () => {
  let controller: AgentauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentauthController],
    }).compile();

    controller = module.get<AgentauthController>(AgentauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
