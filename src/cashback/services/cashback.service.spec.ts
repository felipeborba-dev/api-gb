import { Test, TestingModule } from '@nestjs/testing';

import { CashbackAppService } from '../application/cashback.app-service';
import { CashbackFactory } from './../factories/cashback.factory';
import { CashbackService } from './cashback.service';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './../../infra/database/database.module';
import { GenerateCashBackCommandHandler } from '../commands/generate-cashback/generate-cashback.handler';
import { GetTotalCashbackQueryHandler } from '../queries/get-total-cashback/get-total-cashback.handler';
import { HttpClientModule } from './../../core/infra/http-client/http-client.module';
import { InjectRepository } from '../../core/util/common/inject-repository.common';
import { ORDER_REPOSITORY } from './../../order/repositories/order.repository';
import { RESELLER_REPOSITORY } from './../../order/repositories/reseller.repository';

describe('CashbackService', () => {
  let service: CashbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        DatabaseModule,
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
        InjectRepository(ORDER_REPOSITORY, 'Order'),
        InjectRepository(RESELLER_REPOSITORY, 'Reseller'),
        CashbackFactory,
      ],
    }).compile();

    service = module.get<CashbackService>(CashbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
