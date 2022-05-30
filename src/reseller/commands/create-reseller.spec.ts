import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateResellerCommandHandler } from './create-reseller.handler';
import { DatabaseModule } from './../../infra/database/database.module';
import { InjectRepository } from '../../core/util/common/inject-repository.common';
import { RESELLER_REPOSITORY } from './../../order/repositories/reseller.repository';
import { ResellerFactory } from '../factories/reseller.factory';
import { ResellerService } from '../services/reseller.service';
import { Security } from './../../core/application/security/crypto.security';

describe('CreateResellerCommand', () => {
  let commandHandler: CreateResellerCommandHandler;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule],
      providers: [
        Security,
        CreateResellerCommandHandler,
        ResellerFactory,
        ResellerService,
        InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
      ],
    }).compile();
    commandHandler = module.get<CreateResellerCommandHandler>(
      CreateResellerCommandHandler,
    );
  });
  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
  });
  it('should be defined create reseller', async () => {
    const commandResponse = await commandHandler.execute({
      firstName: 'John',
      lastName: 'Doe',
      cpf: '01234567890',
      email: 'test@test.com',
      password: '123456',
    });
    commandResponse.resellerId;
    expect(commandResponse.resellerId).toBeDefined();
  });
});
