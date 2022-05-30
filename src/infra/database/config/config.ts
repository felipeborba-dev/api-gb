import { AuthenticationSchema } from '../schemas/authentication.schema';
import { CashbackSchema } from '../schemas/cashback.schema';
import { Options } from '@mikro-orm/core';
import { OrderSchema } from '../schemas/order.schema';
import { ResellerSchema } from '../schemas/reseller.schema';
import dotenv from 'dotenv';
dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`,
});

const ormConfig = {
  entities: [CashbackSchema, ResellerSchema, OrderSchema, AuthenticationSchema],
  type: 'postgresql',
  baseDir: process.cwd(),
  clientUrl: process.env.DB_URL,
  autoLoadEntities: true,
  forceEntityConstructor: true,
  port: 5432,
  debug: ['info'],
} as Options;

if (process.env?.NODE_ENV === 'test') {
  ormConfig.type = 'sqlite';
  ormConfig.dbName = 'testDb.db';
  ormConfig.debug = false;
  delete ormConfig.clientUrl;
}

export default ormConfig;
