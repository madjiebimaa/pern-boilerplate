import { Migration } from '@mikro-orm/migrations';

export class Migration20220518075720 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" text null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }

}
