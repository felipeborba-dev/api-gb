import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ResellerModule } from './reseller/reseller.module';
import { CashbackModule } from './cashback/cashback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env.staging'],
    }),
    DatabaseModule,
    ResellerModule,
    OrderModule,
    CashbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
