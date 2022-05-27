import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { GenerateCashbackCommand } from './../../../cashback/commands/generate-cashback/generate-cashback.command';
import { OrderCreatedEvent } from './order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler implements IEventHandler {
  constructor(private readonly commandBus: CommandBus) {}
  async handle(event: OrderCreatedEvent) {
    console.log('OrderCreatedEventHandler Teste', event);
    await this.commandBus.execute(new GenerateCashbackCommand(event.orderId));
  }
}
