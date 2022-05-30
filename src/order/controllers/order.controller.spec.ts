import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderCommandHandler } from '../commands';
import { DatabaseModule } from './../../infra/database/database.module';
import { FindOrderByIdQueryHandler } from '../queries/find-order-by-id/find-order-by-id.handler';
import { FindOrdersQueryHandler } from '../queries/find-orders/find-orders.handler';
import { InjectRepository } from '../../core/util/common/inject-repository.common';
import { ORDER_REPOSITORY } from '../repositories/order.repository';
import { OrderCreatedEventHandler } from '../events';
import { OrderFactory } from '../factories/order.factory';
import { OrderService } from '../services/order.service';
import { OrdersController } from './order.controller';
import { RESELLER_REPOSITORY } from '../repositories/reseller.repository';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule],
      controllers: [OrdersController],
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

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
