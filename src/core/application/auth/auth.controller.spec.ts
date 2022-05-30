import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticationRepository } from './repositories/authentication.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtConstants } from './jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Security } from '../security/crypto.security';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        JwtModule.register({
          secret: JwtConstants.secret || 'secretKey',
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
