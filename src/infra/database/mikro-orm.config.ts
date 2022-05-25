import { Options } from '@mikro-orm/core';
import dotenv from 'dotenv';
dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`,
});

const config = {
  entities: ['./dist/infra/database/schemas'],
  entitiesTs: ['./src/infra/database/schemas'],
  type: 'postgresql',
  baseDir: process.cwd(),
  clientUrl: process.env.DB_URL,
  port: 5432,
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './src/infra/database/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in na transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
} as Options;

export default config;
