import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/core/dto/api.response';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderResponseDto } from '../dto/create-order.response';
import { FindOrdersQuery } from '../queries/find-orders/find-orders.query';
import { JwtAuthGuard } from './../../core/application/auth/jwt-auth.guard';
import { CreateOrderCommand } from './../commands/create-order/create-order.command';
import { FindOrderByIdQuery } from './../queries/find-order-by-id/find-order-by-id.query';

@ApiTags('Order')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
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

  @Version('1')
  @Get()
  async findOrdersHandler(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Req() req: any,
  ): Promise<ApiResponse<CreateOrderResponseDto>> {
    return await this.ok(
      this.queryBus.execute<FindOrdersQuery>(
        new FindOrdersQuery(req.user.id, limit, offset),
      ),
    );
  }
  @Version('1')
  @Get(':id')
  async findOrderByIdHandler(
    @Req() req: any,
    @Param('id') orderId: string,
  ): Promise<ApiResponse<CreateOrderResponseDto>> {
    return await this.ok(
      this.queryBus.execute<FindOrderByIdQuery>(
        new FindOrderByIdQuery(req.user.id, orderId),
      ),
    );
  }
}
