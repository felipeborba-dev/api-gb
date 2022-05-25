import { EntitySchema, ReferenceType } from '@mikro-orm/core';

import { DecimalType } from '../types/decimal.type';
import { Order } from '../../../orders/entities/order.entity';
import { OrderRepository } from '../../../infra/repositories/order.repository';
import { randomUUID } from 'crypto';

export const OrderSchema = new EntitySchema<Order>({
  class: Order,
  name: Order.name,
  customRepository: () => OrderRepository,
  properties: {
    id: { type: 'uuid', primary: true, onCreate: () => randomUUID() },
    code: { type: 'string', unique: true },
    status: { type: 'number' },
    value: { columnType: 'decimal(16,2)', type: DecimalType },
    reseller: {
      reference: ReferenceType.MANY_TO_ONE,
      entity: 'Reseller',
    },
    createdAt: { type: Date, onCreate: () => new Date() },
    updatedAt: {
      type: Date,
      onUpdate: () => new Date(),
      onCreate: () => new Date(),
    },
  } as any,
});
