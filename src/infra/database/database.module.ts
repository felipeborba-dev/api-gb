import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import ormConfig from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development',
        '.env.production',
        '.env.staging',
        '.env',
      ],
    }),
    MikroOrmModule.forRoot(ormConfig),
    MikroOrmModule.forFeature({ entities: ['Cashback', 'Order', 'Reseller'] }),
  ],
})
export class DatabaseModule {}
