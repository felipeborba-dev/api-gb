import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IResellerRepository,
  RESELLER_REPOSITORY,
} from '../../../order/repositories/reseller.repository';
import { CashbackAppService } from './../../application/cashback.app-service';
import { GetTotalCashbackQuery } from './get-total-cashback.query';

@QueryHandler(GetTotalCashbackQuery)
export class GetTotalCashbackQueryHandler implements IQueryHandler {
  constructor(
    private readonly cashbackAppService: CashbackAppService,
    @Inject(RESELLER_REPOSITORY)
    private readonly resellerRepository: IResellerRepository,
  ) {}
  async execute(
    query: GetTotalCashbackQuery,
  ): Promise<{ reseller: string; cashback: number; cpf: string }> {
    try {
      const reseller = await this.resellerRepository.findOneOrFail(
        query.resellerId,
      );
      const totalCashback = await this.cashbackAppService.getTotalCashback(
        reseller.cpf,
      );
      return {
        reseller: reseller.id,
        cashback: totalCashback,
        cpf: reseller.cpf,
      };
    } catch (error) {
      throw error;
    }
  }
}
