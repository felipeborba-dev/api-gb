import { IBaseRepository } from '../../core/repositories/base.repository';
import { Order } from '../entities/order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository extends IBaseRepository<Order> {}
