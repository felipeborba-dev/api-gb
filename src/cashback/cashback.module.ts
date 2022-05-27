import { CashbackFactory } from './factories/cashback.factory';
import { CashbackService } from './services/cashback.service';
import { CqrsModule } from '@nestjs/cqrs';
import { EntityManager } from '@mikro-orm/core';
import { GenerateCashBackCommandHandler } from './commands/generate-cashback/generate-cashback.handler';
import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from './../order/repositories/order.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    CashbackService,
    GenerateCashBackCommandHandler,
    {
      provide: ORDER_REPOSITORY,
      useFactory: (em: EntityManager) => em.getRepository('Order'),
      inject: [EntityManager],
    },
    CashbackFactory,
  ],
})
export class CashbackModule {}
