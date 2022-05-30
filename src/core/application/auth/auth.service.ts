import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { AuthenticationRepository } from './repositories/authentication.repository';
import { AuthenticationStatus } from './../../enums/authentication-status.enum';
import { FindResellerQuery } from './../../../reseller/queries/find-reseller/find-reseller.query';
import { JwtService } from '@nestjs/jwt';
import { QueryBus } from '@nestjs/cqrs';
import { Reseller } from './../../../reseller/entities/reseller.entity';
import { Security } from '../security/crypto.security';
import { addDays } from 'date-fns';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
    private readonly securityService: Security,
    private readonly authRepository: AuthenticationRepository,
  ) {}
  async login({ email, password, ip }: AuthDto) {
    try {
      const reseller = await this.queryBus.execute<FindResellerQuery, Reseller>(
        new FindResellerQuery(email),
      );

      if (
        reseller != null &&
        this.securityService.verify(password, reseller?.password || '')
      ) {
        const payload = {
          sub: reseller.id,
          username: reseller.email,
        };
        const token = this.jwtService.sign(payload);
        const auth = this.authRepository.create({
          client: reseller,
          currentToken: token,
          refreshToken: randomUUID(),
          ip,
          expiresIn: addDays(new Date(), 7),
          status: AuthenticationStatus.ACTIVE,
        });

        await this.authRepository.commit(auth);

        return {
          access_token: token,
          refresh_token: auth.refreshToken,
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      throw new NotImplementedException(refreshToken);
    } catch (error) {
      throw error;
    }
  }
}
