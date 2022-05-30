import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IOrderRepository } from '../../../order/repositories/order.repository';
import { Order } from './../../entities/order.entity';
import { ORDER_REPOSITORY } from './../../repositories/order.repository';
import { FindOrderByIdQuery } from './find-order-by-id.query';

@QueryHandler(FindOrderByIdQuery)
export class FindOrderByIdQueryHandler {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(query: FindOrderByIdQuery): Promise<Order> {
    return await this.orderRepository.findOneOrFail(
      { reseller: { id: query.resellerId } },
      {
        populate: ['cashback', 'reseller'] as any,
        fields: [
          'id',
          'createdAt',
          'code',
          'value',
          'cashback',
          'reseller',
          { cashback: ['id', 'value', 'percentage'] },
          { reseller: ['cpf', 'email', 'firstName', 'lastName', 'status'] },
        ],
      },
    );
  }
}
