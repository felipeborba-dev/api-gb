import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderCommandHandler } from './commands';
import { DatabaseModule } from './../infra/database/database.module';
import { FindOrderByIdQueryHandler } from './queries/find-order-by-id/find-order-by-id.handler';
import { FindOrdersQueryHandler } from './queries/find-orders/find-orders.handler';
import { InjectRepository } from '../core/util/common/inject-repository.common';
import { ORDER_REPOSITORY } from './repositories/order.repository';
import { OrderCreatedEventHandler } from './events';
import { OrderFactory } from './factories/order.factory';
import { OrderService } from './services/order.service';
import { RESELLER_REPOSITORY } from './repositories/reseller.repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule],
      providers: [
        InjectRepository(ORDER_REPOSITORY, 'Order'),
        InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
        OrderService,
        OrderFactory,
        CreateOrderCommandHandler,
        OrderCreatedEventHandler,
        FindOrdersQueryHandler,
        FindOrderByIdQueryHandler,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
