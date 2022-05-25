import { CqrsModule } from '@nestjs/cqrs';
import { CreateResellerCommandHandler } from './commands';
import { EntityManager } from '@mikro-orm/core';
import { Module } from '@nestjs/common';
import { RESELLER_REPOSITORY } from './../orders/repositories/reseller.repository';
import { ResellerFactory } from './factories/reseller.factory';
import { ResellerService } from './services/resellers.service';
import { ResellersController } from './controllers/resellers.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ResellersController],
  providers: [
    CreateResellerCommandHandler,
    ResellerFactory,
    ResellerService,
    {
      provide: RESELLER_REPOSITORY,
      useFactory: (em: EntityManager) => em.getRepository('Reseller'),
      inject: [EntityManager],
    },
  ],
})
export class ResellersModule {}
