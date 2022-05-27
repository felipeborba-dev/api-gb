import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderCreatedEvent } from './order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler implements IEventHandler {
  handle(event: OrderCreatedEvent) {
    console.log('OrderCreatedEventHandler Teste', event);
  }
}
