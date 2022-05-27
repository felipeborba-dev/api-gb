import { Entity } from '../../core/entities/base.entity';

export class Cashback extends Entity {
  constructor(value: number, percentage: number) {
    super();
    this.value = value;
    this.percentage = percentage;
  }
  value: number;
  percentage: number;
}
