import { CreateResellerDto } from './../dto/create-reseller.dto';
import { Injectable } from '@nestjs/common';
import { Reseller } from '../../reseller/entities/reseller.entity';
import { ResellerCreatedEvent } from '../events/reseller-created/reseller.created.event';
import { Security } from './../../core/application/security/crypto.security';
@Injectable()
export class ResellerFactory {
  /**
   *
   */
  constructor(private readonly securityService: Security) {}
  create(dto: CreateResellerDto): Reseller {
    const reseller = new Reseller(
      dto.firstName,
      dto.lastName,
      dto.cpf,
      dto.email,
      this.securityService.encrypt(dto.password),
    );
    reseller.apply(new ResellerCreatedEvent(reseller.id));
    return reseller;
  }
}
