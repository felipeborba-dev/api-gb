import { EntitySchema } from '@mikro-orm/core';
import { Reseller } from '../../../resellers/entities/reseller.entity';
import { ResellerRepository } from '../../../infra/repositories/reseller.repository';
import { randomUUID } from 'crypto';

export const ResellerSchema = new EntitySchema<Reseller>({
  class: Reseller,
  name: Reseller.name,
  customRepository: () => ResellerRepository,
  properties: {
    id: { type: 'uuid', primary: true, onCreate: () => randomUUID() },
    firstName: { type: 'string', length: 100 },
    lastName: { type: 'string', length: 100 },
    cpf: { type: 'string', length: 14, unique: true },
    createdAt: { type: Date, onCreate: () => new Date() },
    updatedAt: {
      type: Date,
      onUpdate: () => new Date(),
      onCreate: () => new Date(),
    },
  } as any,
});
