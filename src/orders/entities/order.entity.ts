import { Aggregate } from '../../core/entities/base.entity';
import { OrderStatus } from './../../core/enums/order-status.enum';
import { Reseller } from '../../resellers/entities/reseller.entity';

export class Order extends Aggregate {
  constructor(code: string, value: number, reseller: Reseller) {
    super();
    this.code = code;
    this.status = OrderStatus.PENDING;
    this.value = value;
    this.reseller = reseller;
  }
  code: string;
  value: number;
  status: OrderStatus;
  reseller: Reseller;
}
