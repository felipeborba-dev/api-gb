import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderCommandHandler } from './commands/create-order/create-order.handler';
import { FindOrderByIdQueryHandler } from './queries/find-order-by-id/find-order-by-id.handler';
import { FindOrdersQueryHandler } from './queries/find-orders/find-orders.handler';
import { InjectRepository } from '../core/util/common/inject-repository.common';
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
    InjectRepository(ORDER_REPOSITORY, 'Order'),
    InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
    OrderService,
    OrderFactory,
    CreateOrderCommandHandler,
    OrderCreatedEventHandler,
    FindOrdersQueryHandler,
    FindOrderByIdQueryHandler,
  ],
})
export class OrderModule {}
