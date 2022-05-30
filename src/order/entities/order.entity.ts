import { Aggregate } from '../../core/entities/base.aggregate';
import { Cashback } from './cashback.value-object';
import { OrderStatus } from './../../core/enums/order-status.enum';
import { Reseller } from '../../reseller/entities/reseller.entity';
import { ResellerStatus } from './../../core/enums/reseller-status.enum';

export class Order extends Aggregate {
  constructor(code: string, value: number, reseller: Reseller) {
    super();
    this.code = code;
    this.status = OrderStatus.Pending;
    this.value = value;
    this.reseller = reseller;
  }
  code: string;
  value: number;
  status: OrderStatus;
  reseller: Reseller;
  cashback: Cashback;

  approve(): void {
    try {
      if (this.reseller.status === ResellerStatus.Active) {
        this.status = OrderStatus.Approved;
      }
    } catch (error) {
      throw error;
    }
  }

  calculateCashback(): { percentage: number; value: number } {
    try {
      let percentage = 0;
      if (this.value <= 1000) {
        percentage = 0.1;
      } else if (this.value > 1000 && this.value <= 1500) {
        percentage = 0.15;
      } else if (this.value > 1500) {
        percentage = 0.2;
      }

      return {
        value: Number((this.value * percentage).toFixed(2)),
        percentage,
      };
    } catch (error) {
      throw error;
    }
  }
}
