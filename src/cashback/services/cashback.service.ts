import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../order/repositories/order.repository';
import { CashbackFactory } from './../factories/cashback.factory';

@Injectable()
export class CashbackService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly cashbackFactory: CashbackFactory,
  ) {}

  async generateCashback(orderId: string): Promise<void> {
    try {
      const order = await this.orderRepository.findOneOrFail(orderId);
      order.cashback = this.cashbackFactory.create(order);
      this.orderRepository.commit();
    } catch (error) {
      throw error;
    }
  }
}
