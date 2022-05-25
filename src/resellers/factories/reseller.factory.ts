import { CreateResellerDto } from './../dto/create-reseller.dto';
import { Injectable } from '@nestjs/common';
import { Reseller } from '../../resellers/entities/reseller.entity';
import { ResellerCreatedEvent } from '../events/reseller-created/reseller.created.event';
@Injectable()
export class ResellerFactory {
  create(dto: CreateResellerDto): Reseller {
    const reseller = new Reseller(dto.firstName, dto.lastName, dto.cpf);
    reseller.apply(new ResellerCreatedEvent(reseller.id));
    return reseller;
  }
}
