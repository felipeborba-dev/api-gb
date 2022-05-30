import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticationRepository } from './repositories/authentication.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Security } from '../security/crypto.security';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        PassportModule,
        JwtModule.register({
          secret: 'testKey',
          signOptions: { expiresIn: '4h' },
        }),
      ],
      providers: [
        AuthService,
        Security,
        JwtStrategy,
        { provide: AuthenticationRepository, useValue: jest.fn() },
      ],
      exports: [AuthService],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
