import { FilterQuery, FindOneOptions } from '@mikro-orm/core';

import { Aggregate } from '../../core/entities/base.entity';

export interface IBaseRepository<T extends Aggregate> {
  findAll(): Promise<T[]>;
  findOne(where: FilterQuery<T>, options?: FindOneOptions<T>): Promise<T>;
  commit(aggregate: T): Promise<T>;
}
