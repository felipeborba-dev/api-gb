import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ResellersModule } from './resellers/resellers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env.staging'],
    }),
    DatabaseModule,
    ResellersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
