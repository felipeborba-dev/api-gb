import { IBaseRepository } from '../../core/repositories/base.repository';
import { Reseller } from '../../reseller/entities/reseller.entity';

export const RESELLER_REPOSITORY = 'RESELLER_REPOSITORY';
export interface IResellerRepository extends IBaseRepository<Reseller> {}
