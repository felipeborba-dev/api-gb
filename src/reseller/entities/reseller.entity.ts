import { Aggregate } from '../../core/entities/base.aggregate';
import { ResellerStatus } from './../../core/enums/reseller-status.enum';

export class Reseller extends Aggregate {
  constructor(
    firstName: string,
    lastName: string,
    cpf: string,
    email: string,
    password: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
  }
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  password: string;
  status: ResellerStatus;
}
