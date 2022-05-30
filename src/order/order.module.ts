import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderCommandHandler } from './commands/create-order/create-order.handler';
import { EntityManager } from '@mikro-orm/core';
import { FindOrderByIdQueryHandler } from './queries/find-order-by-id/find-order-by-id.handler';
import { FindOrdersQueryHandler } from './queries/find-orders/find-orders.handler';
import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from './repositories/order.repository';
import { OrderCreatedEventHandler } from './events';
import { OrderFactory } from './factories/order.factory';
import { OrderService } from './services/order.service';
import { OrdersController } from './controllers/order.controller';
import { RESELLER_REPOSITORY } from './repositories/reseller.repository';

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useFactory: (em: EntityManager) => em.getRepository('Order'),
      inject: [EntityManager],
    },
    {
      provide: RESELLER_REPOSITORY,
      useFactory: (em: EntityManager) => em.getRepository('Reseller'),
      inject: [EntityManager],
    },
    OrderService,
    OrderFactory,
    CreateOrderCommandHandler,
    OrderCreatedEventHandler,
    FindOrdersQueryHandler,
    FindOrderByIdQueryHandler,
  ],
})
export class OrderModule {}
