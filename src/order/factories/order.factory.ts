import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../../order/entities/order.entity';
import { OrderCreatedEvent } from '../../order/events/order-created/order-created.event';
import { CreateOrderDto } from './../dto/create-order.dto';
import {
  IResellerRepository,
  RESELLER_REPOSITORY,
} from './../repositories/reseller.repository';

@Injectable()
export class OrderFactory {
  constructor(
    @Inject(RESELLER_REPOSITORY)
    private readonly resellerRepository: IResellerRepository,
  ) {}
  async create(dto: CreateOrderDto): Promise<Order> {
    try {
      const reseller = await this.resellerRepository.findOneOrFail(
        dto.resellerId,
      );
      const order = new Order(dto.code, dto.value, reseller);
      order.apply(new OrderCreatedEvent(order.id));
      return order;
    } catch (error) {
      throw error;
    }
  }
}
