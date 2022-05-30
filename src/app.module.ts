import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/application/auth/auth.module';
import { CashbackModule } from './cashback/cashback.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ResellerModule } from './reseller/reseller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env.staging'],
    }),
    DatabaseModule,
    AuthModule,
    ResellerModule,
    OrderModule,
    CashbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
