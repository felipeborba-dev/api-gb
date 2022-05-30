import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateResellerCommandHandler } from './commands';
import { DatabaseModule } from './../infra/database/database.module';
import { FindClientHandler } from './queries/find-reseller/find-reseller.handler';
import { InjectRepository } from '../core/util/common/inject-repository.common';
import { RESELLER_REPOSITORY } from './../order/repositories/reseller.repository';
import { ResellerFactory } from './factories/reseller.factory';
import { ResellerService } from './services/reseller.service';
import { ResellersController } from './controllers/reseller.controller';
import { Security } from './../core/application/security/crypto.security';

describe('ResellersService', () => {
  let service: ResellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule],
      controllers: [ResellersController],
      providers: [
        Security,
        CreateResellerCommandHandler,
        FindClientHandler,
        ResellerFactory,
        ResellerService,
        InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
      ],
    }).compile();

    service = module.get<ResellerService>(ResellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
