import { FilterQuery, FindOneOptions, FindOptions } from '@mikro-orm/core';

import { Aggregate } from '../../core/entities/base.aggregate';

export interface IBaseRepository<T extends Aggregate> {
  findAll(): Promise<T[]>;
  find(where: FilterQuery<T>, options?: FindOptions<T, any>): Promise<T[]>;
  findOne(where: FilterQuery<T>, options?: FindOneOptions<T, any>): Promise<T>;
  findOneOrFail(
    where: FilterQuery<T>,
    options?: FindOneOptions<T, any>,
  ): Promise<T>;
  commit(aggregate?: T): Promise<T>;
}
