import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CreateResellerDto } from '../dto/create-reseller.dto';
import { Reseller } from '../entities/reseller.entity';
import {
  IResellerRepository,
  RESELLER_REPOSITORY,
} from './../../order/repositories/reseller.repository';
import { ResellerFactory } from './../factories/reseller.factory';

@Injectable()
export class ResellerService {
  constructor(
    @Inject(RESELLER_REPOSITORY)
    private readonly resellerRepository: IResellerRepository,
    private readonly resellerFactory: ResellerFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async create(dto: CreateResellerDto): Promise<Reseller> {
    try {
      const dbEntity = this.resellerFactory.create(dto);
      const reseller = this.eventPublisher.mergeObjectContext(
        await this.resellerRepository.commit(dbEntity),
      );
      reseller.commit();
      return reseller;
    } catch (error) {
      throw error;
    }
  }
}
