import { Cashback } from './../../order/entities/cashback.value-object';
import { Injectable } from '@nestjs/common';
import { Order } from './../../order/entities/order.entity';

@Injectable()
export class CashbackFactory {
  create(order: Order): Cashback {
    try {
      const { percentage, value } = order.calculateCashback();
      return new Cashback(value, percentage);
    } catch (error) {
      throw error;
    }
  }
}
