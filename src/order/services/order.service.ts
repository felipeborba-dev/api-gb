import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CreateOrderDto } from '../../order/dto/create-order.dto';
import { UpdateOrderDto } from '../../order/dto/update-order.dto';
import { IOrderRepository } from '../../order/repositories/order.repository';
import { OrderFactory } from './../factories/order.factory';
import { ORDER_REPOSITORY } from './../repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderFactory: OrderFactory,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async create(dto: CreateOrderDto) {
    try {
      const dbEntity = await this.orderFactory.create(dto);
      const order = this.eventPublisher.mergeObjectContext(
        await this.orderRepository.commit(dbEntity),
      );
      order.commit();
      return order;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
