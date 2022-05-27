import { Aggregate } from '../../core/entities/base.aggregate';
import { ResellerStatus } from './../../core/enums/reseller-status.enum';

export class Reseller extends Aggregate {
  constructor(firstName: string, lastName: string, cpf: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.cpf = cpf;
  }
  firstName: string;
  lastName: string;
  cpf: string;
  status: ResellerStatus;
}
