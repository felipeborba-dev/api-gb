import { Body, Controller, Post, Version } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/core/dto/api.response';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderResponseDto } from '../dto/create-order.response';
import { CreateOrderCommand } from './../commands/create-order/create-order.command';
@ApiTags('Order')
@Controller('orders')
export class OrdersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Version('1')
  @Post()
  async createOrderHandler(
    @Body() dto: CreateOrderDto,
  ): Promise<ApiResponse<CreateOrderResponseDto>> {
    return await this.ok(
      this.commandBus.execute<CreateOrderCommand, CreateOrderResponseDto>(
        new CreateOrderCommand(dto.code, dto.value, dto.resellerId),
      ),
    );
  }
}
