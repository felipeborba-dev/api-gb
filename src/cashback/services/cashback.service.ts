import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../order/repositories/order.repository';

@Injectable()
export class CashbackService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async generateCashback(orderId: string): Promise<void> {
    try {
      const order = await this.orderRepository.findOneOrFail(orderId);
    } catch (error) {
      throw error;
    }
  }
}
