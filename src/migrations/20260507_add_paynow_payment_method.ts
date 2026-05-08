import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "enum_registrations_payment_method" ADD VALUE IF NOT EXISTS 'paynow';`)
  await db.execute(sql`
   ALTER TYPE "enum_registrations_payment_method" ADD VALUE IF NOT EXISTS 'full-board';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  }
