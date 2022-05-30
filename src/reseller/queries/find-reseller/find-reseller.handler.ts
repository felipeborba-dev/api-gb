import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IResellerRepository } from '../../../order/repositories/reseller.repository';
import { RESELLER_REPOSITORY } from './../../../order/repositories/reseller.repository';
import { Reseller } from './../../entities/reseller.entity';
import { FindResellerQuery } from './find-reseller.query';

@QueryHandler(FindResellerQuery)
export class FindClientHandler implements IQueryHandler {
  constructor(
    @Inject(RESELLER_REPOSITORY)
    private readonly resellerRepository: IResellerRepository,
  ) {}

  async execute(query: FindResellerQuery): Promise<Reseller> {
    const reseller = await this.resellerRepository.findOne({
      email: query.email,
    });

    if (!reseller) {
      throw new NotFoundException(
        `Reseller with email "${query.email}" not found`,
      );
    }

    return reseller;
  }
}
