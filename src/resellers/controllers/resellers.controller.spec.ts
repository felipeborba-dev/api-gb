import { Test, TestingModule } from '@nestjs/testing';

import { ResellerService } from '../services/resellers.service';
import { ResellersController } from './resellers.controller';

describe('ResellersController', () => {
  let controller: ResellersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResellersController],
      providers: [ResellerService],
    }).compile();

    controller = module.get<ResellersController>(ResellersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
