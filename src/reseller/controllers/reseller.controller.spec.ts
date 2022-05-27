import { Test, TestingModule } from '@nestjs/testing';

import { ResellerService } from '../services/reseller.service';
import { ResellersController } from './reseller.controller';

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
