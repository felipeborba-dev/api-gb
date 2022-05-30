import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IOrderRepository } from '../../../order/repositories/order.repository';
import { Order } from './../../entities/order.entity';
import { ORDER_REPOSITORY } from './../../repositories/order.repository';
import { FindOrdersQuery } from './find-orders.query';
@QueryHandler(FindOrdersQuery)
export class FindOrdersQueryHandler {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(query: FindOrdersQuery): Promise<Order[]> {
    return await this.orderRepository.find(
      { reseller: { id: query.resellerId } },
      {
        limit: query.limit,
        offset: query.offset,
        populate: ['cashback'] as any,
        fields: [
          'id',
          'createdAt',
          'code',
          'value',
          'cashback',
          'reseller',
          'status',
          { cashback: ['id', 'value', 'percentage'] },
        ],
      },
    );
  }
}
