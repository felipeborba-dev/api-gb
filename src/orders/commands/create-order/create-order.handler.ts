import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from './create-order.command';
import { OrderService } from '../../../orders/services/order.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler {
  constructor(private readonly orderService: OrderService) {}

  async execute(command: CreateOrderCommand): Promise<string> {
    try {
      const order = await this.orderService.create({
        code: command.code,
        value: command.value,
        resellerId: command.resellerId,
      });
      return order.id;
    } catch (error) {
      throw error;
    }
  }
}
