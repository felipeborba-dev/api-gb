import { Aggregate } from '../../../../core/entities/base.aggregate';
import { AuthenticationStatus } from './../../../enums/authentication-status.enum';
import { Reseller } from './../../../../reseller/entities/reseller.entity';

export class Authentication extends Aggregate {
  client: Reseller;
  currentToken: string;
  refreshToken: string;
  ip: string;
  expiresIn: Date;
  status: AuthenticationStatus;
}
