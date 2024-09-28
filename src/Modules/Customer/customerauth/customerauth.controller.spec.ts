import { Test, TestingModule } from '@nestjs/testing';
import { CustomerauthController } from './customerauth.controller';

describe('CustomerauthController', () => {
  let controller: CustomerauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerauthController],
    }).compile();

    controller = module.get<CustomerauthController>(CustomerauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
