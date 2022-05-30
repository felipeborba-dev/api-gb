import { Body, Controller, Post, Req, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../../core/controllers/base.controller';
import { Ipv4Parser } from '../../../core/util/parsers/ipv4.parser';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post()
  @Version('1')
  async authenticateUser(@Body() { email, password }: AuthDto, @Req() res) {
    return await this.ok(
      this.authService.login({
        email,
        password,
        ip: Ipv4Parser(res.connection.remoteAddress),
      }),
    );
  }
  @Post('refresh')
  @Version('1')
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return await this.ok(this.authService.refreshToken(refreshToken));
  }
}
