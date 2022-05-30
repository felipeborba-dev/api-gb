import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticationRepository } from './repositories/authentication.repository';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectRepository } from '../../../core/util/common/inject-repository.common';
import { JwtConstants } from './jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Security } from '../security/crypto.security';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production', '.env.staging'],
    }),
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [
    AuthService,
    Security,
    JwtStrategy,
    InjectRepository(AuthenticationRepository, 'Authentication'),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
