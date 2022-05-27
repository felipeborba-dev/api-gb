import { CashbackSchema } from './schemas/cashback.schema';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrderSchema } from './schemas/order.schema';
import { ResellerSchema } from './schemas/reseller.schema';

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
    MikroOrmModule.forRoot({
      entities: [CashbackSchema, ResellerSchema, OrderSchema],
      type: 'postgresql',
      baseDir: process.cwd(),
      clientUrl: process.env.DB_URL,
      autoLoadEntities: true,
      forceEntityConstructor: true,
      port: 5432,
      debug: ['info'],
    }),
    MikroOrmModule.forFeature({ entities: ['Cashback', 'Order', 'Reseller'] }),
  ],
})
export class DatabaseModule {}
