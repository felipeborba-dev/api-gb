import { Aggregate } from '../../core/entities/base.entity';
import { EntityRepository } from '@mikro-orm/core';
import { IBaseRepository } from '../../core/repositories/base.repository';
export abstract class BaseRepository<T extends Aggregate>
  extends EntityRepository<T>
  implements IBaseRepository<T>
{
  async commit(aggregate: T): Promise<T> {
    try {
      await this.persistAndFlush(aggregate);
      return aggregate;
    } catch (error) {
      throw error;
    }
  }
}
