import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from './create-order.command';
import { CreateOrderResponseDto } from './../../dto/create-order.response';
import { OrderService } from '../../../order/services/order.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler {
  constructor(private readonly orderService: OrderService) {}

  async execute(command: CreateOrderCommand): Promise<CreateOrderResponseDto> {
    try {
      const order = await this.orderService.create(command);
      return { orderId: order.id };
    } catch (error) {
      throw error;
    }
  }
}
