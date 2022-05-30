import { EntitySchema, ReferenceType, types } from '@mikro-orm/core';

import { Authentication } from './../../../core/application/auth/entities/authentication.entity';
import { AuthenticationRepository } from './../../../core/application/auth/repositories/authentication.repository';
import { randomUUID } from 'crypto';

export const AuthenticationSchema = new EntitySchema<Authentication>({
  class: Authentication,
  name: Authentication.name,
  customRepository: () => AuthenticationRepository,
  properties: {
    id: { type: types.uuid, primary: true, onCreate: () => randomUUID() },
    client: {
      reference: ReferenceType.MANY_TO_ONE,
      entity: 'Reseller',
    },
    currentToken: { type: types.string },
    refreshToken: { type: types.string, unique: true },
    ip: { type: types.string, length: 100 },
    expiresIn: { type: types.datetime },
    status: { type: types.integer },
    createdAt: { type: Date, onCreate: () => new Date() },
    updatedAt: {
      type: Date,
      onUpdate: () => new Date(),
      onCreate: () => new Date(),
    },
  } as any,
});
