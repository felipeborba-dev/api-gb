import { Aggregate } from '../../core/entities/base.aggregate';
import { Reseller } from '../../reseller/entities/reseller.entity';
import { OrderStatus } from './../../core/enums/order-status.enum';
import { ResellerStatus } from './../../core/enums/reseller-status.enum';
import { Cashback } from './cashback.value-object';

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

  calculateCashback(): void {
    try {
      if (this.value >= 1000) {
        this.cashback = new Cashback(this.value * 0.1, 0.1);
      } else if (this.value < 1000 && this.value >= 1500) {
        this.cashback = new Cashback(this.value * 0.15, 0.15);
      } else if (this.value < 1500) {
        this.cashback = new Cashback(this.value * 0.2, 0.2);
      }
    } catch (error) {
      throw error;
    }
  }
}
    } catch (error) {
      throw error;
    }
  }
}
