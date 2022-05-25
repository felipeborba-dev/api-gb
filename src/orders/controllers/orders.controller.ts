import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderCommand } from './../commands/create-order/create-order.command';

@Controller('orders')
export class OrdersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  async createOrderHandler(@Body() dto: CreateOrderDto) {
    return await this.ok(
      Promise.resolve({
        orderId: await this.commandBus.execute<CreateOrderCommand, string>(
          new CreateOrderCommand(dto.code, dto.value, dto.resellerId),
        ),
      }),
    );
  }
}
