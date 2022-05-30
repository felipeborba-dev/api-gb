import { CqrsModule } from '@nestjs/cqrs';
import { CreateResellerCommandHandler } from './commands';
import { FindClientHandler } from './queries/find-reseller/find-reseller.handler';
import { InjectRepository } from '../core/util/common/inject-repository.common';
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
    InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
  ],
})
export class ResellerModule {}
