import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderCommandHandler } from './create-order.handler';
import { DatabaseModule } from './../../../infra/database/database.module';
import { InjectRepository } from '../../../core/util/common/inject-repository.common';
import { ORDER_REPOSITORY } from './../../repositories/order.repository';
import { OrderFactory } from './../../factories/order.factory';
import { OrderService } from './../../services/order.service';
import { RESELLER_REPOSITORY } from './../../repositories/reseller.repository';
import { mockedResellerRepository } from './../../../core/tests/mocks/repositories/mock-order.repository';

describe('CreateOrderCommandHandler', () => {
  let commandHandler: CreateOrderCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule],
      providers: [
        CreateOrderCommandHandler,
        OrderFactory,
        OrderService,
        InjectRepository(ORDER_REPOSITORY, 'Order'),
        {
          provide: RESELLER_REPOSITORY,
          useValue: mockedResellerRepository,
        },
      ],
    }).compile();
    commandHandler = module.get<CreateOrderCommandHandler>(
      CreateOrderCommandHandler,
    );
  });
  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
  });

  it('should be defined create order', async () => {
    const commandResponse = await commandHandler.execute({
      code: '123456',
      value: 1000,
      resellerId: '123456',
    });
    expect(commandResponse.orderId).toBeDefined();
  });
});
