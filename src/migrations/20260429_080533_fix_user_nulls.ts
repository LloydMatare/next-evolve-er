import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "users" SET "name" = COALESCE("name", 'Team Member');
    UPDATE "users" SET "role" = COALESCE("role", 'Summit Director');
    ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
    ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;
    ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;`)
}
