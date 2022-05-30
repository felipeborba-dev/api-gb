import { CashbackAppService } from './application/cashback.app-service';
import { CashbackFactory } from './factories/cashback.factory';
import { CashbackService } from './services/cashback.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GenerateCashBackCommandHandler } from './commands/generate-cashback/generate-cashback.handler';
import { GetTotalCashbackQueryHandler } from './queries/get-total-cashback/get-total-cashback.handler';
import { HttpClientModule } from './../core/infra/http-client/http-client.module';
import { InjectRepository } from '../core/util/common/inject-repository.common';
import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from './../order/repositories/order.repository';
import { RESELLER_REPOSITORY } from './../order/repositories/reseller.repository';

@Module({
  imports: [
    CqrsModule,
    HttpClientModule.forRoot({
      baseURL: process.env.CASHBACK_API_URI,
      headers: { token: process.env.CASHBACK_API_TOKEN },
    }),
  ],
  providers: [
    CashbackService,
    GenerateCashBackCommandHandler,
    GetTotalCashbackQueryHandler,
    CashbackAppService,
    CashbackFactory,
    InjectRepository(ORDER_REPOSITORY, 'Order'),
    InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
  ],
})
export class CashbackModule {}
