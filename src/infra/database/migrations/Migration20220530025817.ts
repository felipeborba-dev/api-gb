import { Migration } from '@mikro-orm/migrations';

export class Migration20220530025817 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "reseller" ("id" uuid not null, "first_name" varchar(100) not null, "last_name" varchar(100) not null, "cpf" varchar(14) not null, "email" varchar(120) not null, "status" int not null default 0, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "reseller" add constraint "reseller_cpf_unique" unique ("cpf");');
    this.addSql('alter table "reseller" add constraint "reseller_email_unique" unique ("email");');
    this.addSql('alter table "reseller" add constraint "reseller_pkey" primary key ("id");');

    this.addSql('create table "cashback" ("id" uuid not null, "value" decimal(16,2) not null, "percentage" decimal(16,2) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "cashback" add constraint "cashback_pkey" primary key ("id");');

    this.addSql('create table "order" ("id" uuid not null, "code" varchar(255) not null, "status" int not null, "value" decimal(16,2) not null, "reseller_id" uuid not null, "cashback_id" uuid null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "order" add constraint "order_code_unique" unique ("code");');
    this.addSql('alter table "order" add constraint "order_cashback_id_unique" unique ("cashback_id");');
    this.addSql('alter table "order" add constraint "order_pkey" primary key ("id");');

    this.addSql('create table "authentication" ("id" uuid not null, "client_id" uuid not null, "current_token" varchar(255) not null, "refresh_token" varchar(255) not null, "ip" varchar(100) not null, "expires_in" timestamptz(0) not null, "status" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "authentication" add constraint "authentication_refresh_token_unique" unique ("refresh_token");');
    this.addSql('alter table "authentication" add constraint "authentication_pkey" primary key ("id");');

    this.addSql('alter table "order" add constraint "order_reseller_id_foreign" foreign key ("reseller_id") references "reseller" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cashback_id_foreign" foreign key ("cashback_id") references "cashback" ("id") on update cascade on delete set null;');

    this.addSql('alter table "authentication" add constraint "authentication_client_id_foreign" foreign key ("client_id") references "reseller" ("id") on update cascade;');
  }

}
