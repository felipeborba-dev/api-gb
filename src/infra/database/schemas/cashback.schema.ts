import { Cashback } from './../../../order/entities/cashback.value-object';
import { DecimalType } from '../types/decimal.type';
import { EntitySchema } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

export const CashbackSchema = new EntitySchema<Cashback>({
  class: Cashback,
  name: Cashback.name,
  properties: {
    id: { type: 'uuid', primary: true, onCreate: () => randomUUID() },
    value: { columnType: 'decimal(16,2)', type: DecimalType },
    percentage: { columnType: 'decimal(16,2)', type: DecimalType },
    createdAt: { type: Date, onCreate: () => new Date() },
    updatedAt: {
      type: Date,
      onUpdate: () => new Date(),
      onCreate: () => new Date(),
    },
  } as any,
});
