import { Aggregate } from '../../core/entities/base.entity';

export class Reseller extends Aggregate {
  /**
   *
   */
  constructor(firstName: string, lastName: string, cpf: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.cpf = cpf;
  }
  firstName: string;
  lastName: string;
  cpf: string;
}
