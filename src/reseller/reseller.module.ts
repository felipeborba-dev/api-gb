import { CqrsModule } from '@nestjs/cqrs';
import { CreateResellerCommandHandler } from './commands';
import { EntityManager } from '@mikro-orm/core';
import { FindClientHandler } from './queries/find-reseller/find-reseller.handler';
import { Module } from '@nestjs/common';
import { RESELLER_REPOSITORY } from './../order/repositories/reseller.repository';
import { ResellerFactory } from './factories/reseller.factory';
import { ResellerService } from './services/reseller.service';
import { ResellersController } from './controllers/reseller.controller';
import { Security } from './../core/application/security/crypto.security';

@Module({
  imports: [CqrsModule],
  controllers: [ResellersController],
  providers: [
    Security,
    CreateResellerCommandHandler,
    FindClientHandler,
    ResellerFactory,
    ResellerService,
    {
      provide: RESELLER_REPOSITORY,
      useFactory: (em: EntityManager) => em.getRepository('Reseller'),
      inject: [EntityManager],
    },
  ],
})
export class ResellerModule {}
