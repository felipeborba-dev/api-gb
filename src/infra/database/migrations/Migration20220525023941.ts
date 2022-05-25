import { Migration } from '@mikro-orm/migrations';

export class Migration20220525023941 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "reseller" ("id" uuid not null, "first_name" varchar(100) not null, "last_name" varchar(100) not null, "cpf" varchar(14) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "reseller" add constraint "reseller_cpf_unique" unique ("cpf");');
    this.addSql('alter table "reseller" add constraint "reseller_pkey" primary key ("id");');

    this.addSql('create table "order" ("id" uuid not null, "code" varchar(255) not null, "status" int not null, "value" decimal(16,2) not null, "reseller_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "order" add constraint "order_code_unique" unique ("code");');
    this.addSql('alter table "order" add constraint "order_pkey" primary key ("id");');

    this.addSql('alter table "order" add constraint "order_reseller_id_foreign" foreign key ("reseller_id") references "reseller" ("id") on update cascade;');
  }

}
