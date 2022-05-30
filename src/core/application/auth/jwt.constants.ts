import dotenv from 'dotenv';

dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`,
});

export class JwtConstants {
  static secret: string = process.env.SECURITY_SETTING_SECRET_KEY;
}
