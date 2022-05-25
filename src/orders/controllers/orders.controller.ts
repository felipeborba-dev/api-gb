import { Body, Controller, HttpStatus, Post, Version } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderCommand } from './../commands/create-order/create-order.command';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Version('1')
  @Post()
  async createOrderHandler(@Body() dto: CreateOrderDto): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: any;
  }> {
    return await this.ok(
      Promise.resolve({
        orderId: await this.commandBus.execute<CreateOrderCommand, string>(
          new CreateOrderCommand(dto.code, dto.value, dto.resellerId),
        ),
      }),
    );
  }
}
